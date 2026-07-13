'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/store/useCart';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  category: string;
  image: string;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  
  const discount = product.discount || 0;
  const discountedPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ 
      id: product._id, 
      name: product.name, 
      price: discountedPrice, 
      quantity: 1, 
      image: product.image 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/50">
        <Link href={`/product/${product._id}`} className="block w-full h-full">
          <Image
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-sm">
            Sale {discount}% Off
          </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20 pointer-events-none">
          <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 hover:scale-110 transition-transform pointer-events-auto" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 hover:scale-110 transition-transform pointer-events-auto" nativeButton={false} render={<Link href={`/product/${product._id}`} />}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">{product.category}</div>
        <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/product/${product._id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center gap-2">
          {discount > 0 ? (
            <>
              <span className="font-medium text-lg text-primary">${discountedPrice.toFixed(2)}</span>
              <span className="text-muted-foreground line-through text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
