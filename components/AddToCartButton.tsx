'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    router.push('/cart');
  };

  return (
    <Button size="lg" className="flex-1 rounded-full text-lg h-14" onClick={handleBuyNow}>
      <ShoppingBag className="mr-2 h-5 w-5" />
      Buy Now
    </Button>
  );
}
