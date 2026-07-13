import { Leaf, Droplets, Sparkles, Heart } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">Our Story</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Medina Beauty was born from a passion for the rich, natural ingredients found in the heart of the Mediterranean. We believe that true beauty comes from nature, and our mission is to bring the timeless skincare rituals of Tunisia to the modern world.
            </p>
          </div>
        </section>

        {/* Image and Text Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden">
              <Image 
                src="/our-story.jpg" 
                alt="Medina Beauty Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Crafted with Heritage</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                For generations, Mediterranean women have relied on the pure oils, botanical extracts, and floral waters of our region to maintain their radiant skin and lustrous hair. At Medina Beauty, we honor these ancient traditions by combining them with modern dermatological science.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Every product is carefully formulated and handcrafted with love, ensuring that you receive only the highest quality, ethically sourced ingredients. We do not use harsh chemicals—just the pure essence of nature.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border/50 text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  <Leaf className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">100% Natural</h3>
                <p className="text-muted-foreground">Sourced directly from nature, free from synthetic additives.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/50 text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Cruelty-Free</h3>
                <p className="text-muted-foreground">We love animals. Our products are never tested on them.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/50 text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  <Droplets className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Pure Hydration</h3>
                <p className="text-muted-foreground">Formulas designed to lock in moisture and protect your skin.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/50 text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Luxurious Quality</h3>
                <p className="text-muted-foreground">Premium ingredients for a high-end skincare experience.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
