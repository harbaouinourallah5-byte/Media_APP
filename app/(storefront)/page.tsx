import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

async function getFeaturedProducts() {
  try {
    await dbConnect();
    // In a real scenario we'd query by `featured: true` or limit to 4
    const products = await Product.find({}).limit(4).lean();
    
    // If no products in DB yet, return placeholders for demo
    if (products.length === 0) {
      return [
        { 
          _id: '1', 
          name: 'Trousse de maquillage', 
          description: 'Une magnifique trousse transparente rose contenant 5 essentiels : Concealer, Blush, Gloss, Mascara et Contour des Lèvres. En bonus : un mini parfum en cadeau !',
          price: 45, 
          category: 'Makeup', 
          image: '/trousse.jpg',
          stock: 1
        }
      ];
    }
    
    return products.map(p => ({
      _id: p._id.toString(),
      name: p.name,
      price: p.price,
      discount: p.discount || 0,
      category: p.category,
      image: p.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      stock: p.stock ?? 1
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
        {/* HERO SECTION */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=2000"
              alt="Medina Beauty Luxury Skincare"
              fill
              className="object-cover object-center scale-105 animate-slow-zoom"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
            <span className="uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6 animate-fade-in-up">
              Natural • Authentic • Pure
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Mediterranean<br/>Luxury
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Discover cosmetics and skincare handcrafted with love in Tunisia, designed to enhance your natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link href="/shop">
                <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-8 text-lg h-14">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="rounded-full text-white border-white hover:bg-white hover:text-black px-8 text-lg h-14 bg-transparent backdrop-blur-sm">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED CATEGORIES */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary"></div>
              <span className="uppercase tracking-widest text-sm text-primary font-medium">Discover</span>
              <div className="h-px w-12 bg-primary"></div>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-16 text-foreground">Our Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Skincare', icon: '🌿', desc: 'Nourish your skin' },
                { name: 'Makeup', icon: '💄', desc: 'Enhance your features' },
                { name: 'Fragrance', icon: '🌸', desc: 'Signature scents' },
                { name: 'Haircare', icon: '✨', desc: 'Shine & volume' }
              ].map((cat, i) => (
                <Link key={i} href={`/shop?category=${cat.name}`} className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 cursor-pointer block">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-transform duration-500">
                    {cat.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{cat.name}</h3>
                  <p className="text-muted-foreground">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="uppercase tracking-widest text-sm text-primary font-medium">Curated</span>
                  <div className="h-px w-12 bg-primary"></div>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Featured Products</h2>
              </div>
              <Link href="/shop" className="mt-6 md:mt-0 group flex items-center gap-2 text-primary font-medium uppercase tracking-wider hover:text-foreground transition-colors">
                View All <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product: any, index: number) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* BRAND STORY */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <span className="uppercase tracking-widest text-sm font-medium mb-6 block opacity-80">The Medina Promise</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Crafted from nature, designed for the modern woman.
            </h2>
            <p className="text-lg md:text-xl font-light opacity-90 mb-12 max-w-2xl mx-auto">
              We source the finest organic ingredients from the Mediterranean to create products that not only make you look beautiful but feel beautifully healthy.
            </p>
            <Link href="/about">
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-8">
                Read Our Story
              </Button>
            </Link>
          </div>
        </section>
    </>
  );
}
