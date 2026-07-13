import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { userId, pointsToAdd } = await req.json();

    if (!userId || !pointsToAdd) {
      return NextResponse.json({ message: 'User ID and points are required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.points = (user.points || 0) + pointsToAdd;
    await user.save();

    return NextResponse.json({ 
      message: 'Points added successfully', 
      newTotal: user.points 
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
