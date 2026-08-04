import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { userId, userName, rating, comment } = await req.json();

    if (!userId || !rating || !comment) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (id === '1') {
      return NextResponse.json({ 
        message: 'Review added successfully (Test Mode)!', 
        product: { reviews: [{ rating: Number(rating), comment, name: userName, createdAt: new Date() }] }
      }, { status: 201 });
    }

    await dbConnect();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if already reviewed
    const alreadyReviewed = product.reviews?.find((r: any) => r.user.toString() === userId);
    if (alreadyReviewed) {
      return NextResponse.json({ message: 'You have already reviewed this product' }, { status: 400 });
    }

    const review = {
      user: userId,
      name: userName || user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    return NextResponse.json({ 
      message: 'Review added successfully!', 
      product
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
