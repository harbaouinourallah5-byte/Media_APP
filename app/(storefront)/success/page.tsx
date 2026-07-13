'use client';

import { useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
        <div className="max-w-md w-full bg-card p-10 rounded-3xl shadow-sm border border-border/50 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4 text-foreground">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We have received your order and will contact you shortly to arrange the delivery (Cash on Delivery).
          </p>
          <Button nativeButton={false} render={<Link href="/shop" />} className="w-full h-12 rounded-xl text-lg">
            Continue Shopping
          </Button>
        </div>
    </div>
  );
}
