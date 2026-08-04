'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    let imageUrl = formData.get('image') as string;

    // Upload the file if one is selected
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.success) {
          imageUrl = uploadJson.url;
        } else {
          alert('Failed to upload image');
          setLoading(false);
          return;
        }
      } catch (e) {
        alert('Error uploading image');
        setLoading(false);
        return;
      }
    }

    const data = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: Number(formData.get('price')),
      discount: Number(formData.get('discount')),
      stock: Number(formData.get('stock')),
      pointsCost: Number(formData.get('pointsCost')) || 0,
      description: formData.get('description'),
      image: imageUrl || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Button nativeButton={false} variant="ghost" size="icon" render={<Link href="/admin/products" />}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" required placeholder="Mediterranean Rose Water" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" required placeholder="Skincare" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (DT)</Label>
              <Input id="price" name="price" type="number" step="0.01" required placeholder="32.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input id="discount" name="discount" type="number" min="0" max="100" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pointsCost">Points to Redeem</Label>
              <Input id="pointsCost" name="pointsCost" type="number" min="0" defaultValue="0" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" name="stock" type="number" required placeholder="100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageFile">Product Image (Upload)</Label>
              <Input id="imageFile" type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="mt-2 relative w-20 h-20 rounded overflow-hidden border">
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Describe your luxurious product in detail..."
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </form>
      </div>
    </div>
  );
}
