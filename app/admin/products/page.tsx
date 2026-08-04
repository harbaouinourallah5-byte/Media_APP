import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteProductButton } from '@/components/DeleteProductButton';

async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({}).lean();
    return products.map(p => ({
      _id: p._id.toString(),
      name: p.name,
      price: p.price,
      category: p.category,
      discount: p.discount || 0,
      stock: p.stock,
      image: p.image || '/placeholder.jpg'
    }));
  } catch (error) {
    return [];
  }
}

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your catalog.</p>
        </div>
        <Button nativeButton={false} render={<Link href="/admin/products/new" />}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                  No products found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toFixed(2)} DT</TableCell>
                <TableCell>
                  {product.discount > 0 ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {product.discount}% Off
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button nativeButton={false} variant="ghost" size="icon" render={<Link href={`/admin/products/${product._id}/edit`} />}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit product</span>
                  </Button>
                  <DeleteProductButton id={product._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
