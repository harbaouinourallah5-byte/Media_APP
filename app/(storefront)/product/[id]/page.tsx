import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Truck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { RedeemPointsButton } from '@/components/RedeemPointsButton';
import { ProductReviews } from '@/components/ProductReviews';

async function getProduct(id: string) {
  if (id === '1') {
    return {
      _id: '1',
      name: 'Trousse de maquillage',
      description: 'Une magnifique trousse transparente rose contenant 5 essentiels : Concealer, Blush, Gloss, Mascara et Contour des Lèvres. En bonus : un mini parfum en cadeau !',
      price: 45,
      discount: 0,
      category: 'Makeup',
      image: '/trousse.jpg',
      stock: 10,
      pointsCost: 0,
      rating: 5,
      numReviews: 0,
      reviews: []
    };
  }

  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return {
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount || 0,
      category: product.category,
      image: product.image,
      stock: product.stock,
      pointsCost: product.pointsCost || 0,
      rating: product.rating || 0,
      numReviews: product.numReviews || 0,
      reviews: product.reviews || []
    };
  } catch (error) {
    return null;
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover animate-slow-zoom" 
                    priority
                  />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-muted-foreground fill-transparent'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.numReviews} reviews)</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                {product.discount > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-primary">{(product.price * (1 - product.discount / 100)).toFixed(2)} DT</span>
                    <span className="text-xl text-muted-foreground line-through">{product.price.toFixed(2)} DT</span>
                    <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                      Save {product.discount}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary">{product.price.toFixed(2)} DT</span>
                )}
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="font-medium mr-2 text-foreground">Availability:</span>
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">In Stock ({product.stock} units)</span>
                  ) : (
                    <span className="text-destructive font-medium">Out of Stock</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="font-medium mr-2 text-foreground">Category:</span>
                  {product.category}
                </div>
              </div>
              
              {product.stock > 0 ? (
                <div className="flex flex-col mb-10 gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <AddToCartButton product={{ 
                      _id: product._id, 
                      name: product.name, 
                      price: product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price, 
                      image: product.image 
                    }} />
                  </div>
                  <RedeemPointsButton product={{ _id: product._id, name: product.name, pointsCost: product.pointsCost }} />
                </div>
              ) : (
                <div className="mb-10 p-4 bg-muted text-center rounded-lg border">
                  <p className="font-medium">This item is currently out of stock.</p>
                </div>
              )}
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-8 mt-auto">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Free Shipping</h4>
                    <p className="text-xs">On orders over 50 DT</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Secure Checkout</h4>
                    <p className="text-xs">100% Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-20">
            <ProductReviews productId={product._id} initialReviews={product.reviews} />
          </div>
        </div>
      </main>
    </div>
  );
}
