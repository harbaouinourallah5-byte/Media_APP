'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const baseTotal = totalPrice();
  const finalTotal = baseTotal;

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-heading text-4xl font-bold mb-10 text-foreground">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
              <h2 className="text-2xl font-heading mb-4 text-muted-foreground">Your cart is empty</h2>
              <p className="mb-8 text-muted-foreground">Looks like you haven't added any premium cosmetics yet.</p>
              <Link href="/shop">
                <Button size="lg" className="rounded-full">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 p-4 bg-card rounded-2xl border border-border/50 items-center">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg">{item.name}</h3>
                      <p className="text-primary font-medium mt-1">{item.price.toFixed(2)} DT</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="w-20 text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive transition-colors" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="w-full lg:w-96">
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-28">
                  <h3 className="font-heading text-xl font-semibold mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{baseTotal.toFixed(2)} DT</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-primary font-medium">Free (COD)</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{finalTotal.toFixed(2)} DT</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/50">
                    <Link href="/checkout">
                      <Button className="w-full h-14 rounded-xl text-lg group mt-4">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
