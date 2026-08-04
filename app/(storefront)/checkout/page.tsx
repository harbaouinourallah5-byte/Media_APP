'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/useAuth';
import { useCart } from '@/store/useCart';
import { toast } from 'sonner';
import { ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

const SHIPPING_FEE = 0.00;
const WHATSAPP_NUMBER = "21652612052"; // Removed the + for the wa.me link

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, totalItems } = useCart();
  const { user, updatePoints } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const total = totalPrice() + SHIPPING_FEE;

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && !isSubmitting) {
      router.push('/shop');
    }
  }, [mounted, items, router, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Compile order details into a single readable message for WhatsApp
    let orderDetails = `*NEW ORDER (Cash on Delivery)* 🛍️\n\n`;
    orderDetails += `*Customer Details:*\n`;
    orderDetails += `👤 Name: ${formData.get('firstName')} ${formData.get('lastName')}\n`;
    orderDetails += `📞 Phone: ${formData.get('phone')}\n`;
    orderDetails += `📍 State: ${formData.get('state')}\n`;
    orderDetails += `🏠 Address: ${formData.get('address')}\n\n`;
    
    orderDetails += `*Order Items:*\n`;
    items.forEach(item => {
      orderDetails += `- ${item.quantity}x ${item.name} (${item.price.toFixed(2)} DT)\n`;
    });
    
    orderDetails += `\n*Subtotal:* ${totalPrice().toFixed(2)} DT\n`;
    orderDetails += `*Shipping:* ${SHIPPING_FEE.toFixed(2)} DT\n`;
    orderDetails += `*TOTAL TO COLLECT:* ${total.toFixed(2)} DT`;

    const pointsEarned = Math.floor(total / 5);

    // Save order to database for admin tracking and points approval
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: user?.id,
          customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
          email: user?.email || 'guest@example.com',
          address: `${formData.get('address')}, ${formData.get('state')}`,
          items: items.map(i => ({ product: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          totalPrice: total,
          pointsEarned: user ? pointsEarned : 0,
          pointsStatus: user ? 'pending' : 'none'
        })
      });

      if (user) {
        toast.success(`Order placed! ${pointsEarned} Points are pending admin approval.`);
      }
    } catch (err) {
      console.error("Failed to save order", err);
    }

    // Copy the text for the user so they can paste it in Messenger
    try {
      await navigator.clipboard.writeText(orderDetails);
      toast.success("Order details copied! Please paste them in the Messenger chat to confirm your order.", { duration: 6000 });
    } catch (e) {
      console.error("Failed to copy text", e);
    }
    
    const messengerUrl = `https://m.me/61591538024777`;

    // Open Messenger in a new tab
    window.open(messengerUrl, '_blank');

    // Clear cart and go back home
    clearCart();
    router.push('/');
    setIsSubmitting(false);
  };

  if (!mounted || items.length === 0) return null;

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Shipping Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">Shipping Details</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required className="h-12 bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required className="h-12 bg-background" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required className="h-12 bg-background" placeholder="+216 50 000 000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Wilaya</Label>
                    <Input id="state" name="state" required className="h-12 bg-background" placeholder="e.g. Ariana, Tunis, Sousse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Delivery Address</Label>
                  <Input id="address" name="address" required className="h-12 bg-background" placeholder="Street name, building, apartment number" />
                </div>
              </form>
            </div>

            {/* Payment Method Section (Read Only) */}
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">Payment Method</h2>
              </div>
              
              <div className="p-4 border-2 border-primary rounded-xl bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full border-4 border-primary bg-background flex-shrink-0" />
                  <span className="font-medium text-lg">Cash on Delivery (Paiement à la livraison)</span>
                </div>
                <ShoppingBag className="h-5 w-5 text-primary opacity-50" />
              </div>
              <p className="text-muted-foreground text-sm mt-4 ml-7">
                You will pay exactly <span className="font-semibold text-foreground">{total.toFixed(2)} DT</span> to the delivery driver when your package arrives.
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm sticky top-24">
              <h2 className="text-2xl font-heading font-semibold mb-6 pb-6 border-b">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-muted-foreground text-sm mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pb-6 border-b text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({totalItems()} items)</span>
                  <span>{totalPrice().toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping Fee</span>
                  <span>{SHIPPING_FEE.toFixed(2)} DT</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">{total.toFixed(2)} DT</span>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full h-14 text-lg rounded-xl flex items-center gap-2"
              >
                {isSubmitting ? "Processing..." : "Order via Messenger"}
                {!isSubmitting && <ArrowRight className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
