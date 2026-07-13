import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: 'User ID and Product ID are required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    if (!product.pointsCost || product.pointsCost <= 0) {
      return NextResponse.json({ message: 'This product cannot be redeemed with points' }, { status: 400 });
    }

    if ((user.points || 0) < product.pointsCost) {
      return NextResponse.json({ message: 'Insufficient points' }, { status: 400 });
    }

    // Deduct points
    user.points -= product.pointsCost;
    await user.save();

    return NextResponse.json({ 
      message: 'Points redeemed successfully', 
      newTotal: user.points,
      productName: product.name
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
