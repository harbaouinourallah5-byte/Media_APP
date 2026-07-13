import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import { EditProductForm } from './EditProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    _id: product._id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    discount: product.discount || 0,
    stock: product.stock,
    pointsCost: product.pointsCost || 0,
    description: product.description,
    image: product.image || '',
  };

  return <EditProductForm product={serializedProduct} />;
}
