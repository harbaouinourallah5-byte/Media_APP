'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CATEGORIES = ['All Products', 'Skincare', 'Makeup', 'Fragrance', 'Haircare'];

export function ShopSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All Products';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || 'All Products');
  }, [searchParams]);

  const updateUrl = (newQuery: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (newCategory && newCategory !== 'All Products') params.set('category', newCategory);
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(query, category);
  };

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    updateUrl(query, cat);
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Search</h3>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-9 bg-card" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
        <ul className="space-y-2 text-muted-foreground">
          {CATEGORIES.map((cat) => (
            <li 
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`cursor-pointer transition-colors ${category === cat ? 'font-medium text-primary' : 'hover:text-primary'}`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
