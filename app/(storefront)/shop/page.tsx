import { ProductCard } from '@/components/ProductCard';
import { ShopSidebar } from '@/components/ShopSidebar';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

async function getProducts(query?: string, category?: string) {
  try {
    await dbConnect();
    
    const filter: any = {};
    if (query) {
      filter.name = { $regex: query, $options: 'i' };
    }
    if (category && category !== 'All Products') {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    
    if (products.length === 0 && !query && (!category || category === 'All Products')) {
      return [
        { _id: '1', name: 'Luminous Glow Serum', price: 65, category: 'Skincare', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
        { _id: '2', name: 'Mediterranean Rose Water', price: 32, category: 'Toner', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800' },
        { _id: '3', name: 'Velvet Matte Lipstick', price: 28, category: 'Makeup', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800' },
        { _id: '4', name: 'Golden Sands Bronzer', price: 45, category: 'Makeup', image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800' },
        { _id: '5', name: 'Olive Oil Hair Mask', price: 38, category: 'Haircare', image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800' },
        { _id: '6', name: 'Jasmine Bloom Perfume', price: 85, category: 'Fragrance', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800' },
      ];
    }
    return products.map(p => ({
      _id: p._id.toString(),
      name: p.name,
      price: p.price,
      discount: p.discount || 0,
      category: p.category,
      image: p.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  
  const products = await getProducts(query, category);

  return (
    <>
        <div className="bg-muted/30 py-16 border-b border-border/50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Shop The Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore our full range of luxurious, natural cosmetics inspired by the beauty of the Mediterranean.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
          <ShopSidebar />
          
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product: any, index: number) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
    </>
  );
}
