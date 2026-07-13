'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/useAuth';
import { toast } from 'sonner';
import { Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RedeemPointsButton({ 
  product 
}: { 
  product: { _id: string, name: string, pointsCost: number } 
}) {
  const { user, updatePoints } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product.pointsCost || product.pointsCost <= 0) {
    return null; // Not redeemable
  }

  // If user is not logged in or doesn't have enough points
  if (!user || (user.points || 0) < product.pointsCost) {
    const pointsNeeded = product.pointsCost - (user?.points || 0);
    return (
      <div className="mt-4 p-4 rounded-xl border-2 border-primary/20 bg-primary/5 flex flex-col items-center text-center">
        <Gift className="h-6 w-6 text-primary mb-2" />
        <h4 className="font-semibold text-foreground">Redeem for Free!</h4>
        <p className="text-sm text-muted-foreground mt-1">
          This item costs <strong>{product.pointsCost} Points</strong>.
          <br/>
          {!user ? "Sign in to start earning points." : `You need ${pointsNeeded} more points to get it for free.`}
        </p>
      </div>
    );
  }

  const handleRedeem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const address = formData.get('address');
    const phone = formData.get('phone');
    
    try {
      const res = await fetch('/api/users/redeem-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId: product._id })
      });

      const data = await res.json();

      if (res.ok) {
        updatePoints(-product.pointsCost); // Deduct points locally
        toast.success(`🎉 You successfully redeemed ${product.name}!`);
        setIsOpen(false);
        
        // Open WhatsApp
        let msg = `*🎉 REWARD CLAIMED!* 🎁\n\n`;
        msg += `*Customer:* ${user.name}\n`;
        msg += `*Phone:* ${phone}\n`;
        msg += `*Address:* ${address}\n\n`;
        msg += `*Reward:* ${product.name}\n`;
        msg += `*Points Used:* ${product.pointsCost}\n`;
        msg += `*Total to pay:* 0 DT + Shipping`;
        
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/21652612052?text=${encoded}`, '_blank');
      } else {
        toast.error(data.message || "Failed to redeem points");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 p-4 rounded-xl border-2 border-primary bg-primary/5">
      <div className="flex flex-col items-center text-center mb-4">
        <Gift className="h-6 w-6 text-primary mb-2" />
        <h4 className="font-semibold text-foreground">You have enough points!</h4>
        <p className="text-sm text-muted-foreground mt-1">
          You can get this for <strong>{product.pointsCost} Points</strong> instead of paying.
        </p>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger render={<Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl h-12 text-md font-bold transition-all hover:scale-[1.02]" />}>
          Redeem for Free! 🎁
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Reward 🎁</DialogTitle>
            <DialogDescription>
              Are you sure you want to spend {product.pointsCost} points to get {product.name}?
              You will still need to pay the standard delivery fee.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRedeem} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Your Phone Number</Label>
              <Input id="phone" name="phone" required placeholder="+216 50 000 000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Delivery Address</Label>
              <Input id="address" name="address" required placeholder="Where should we send it?" />
            </div>
            <Button type="submit" className="w-full h-12 mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm & Deduct Points"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
