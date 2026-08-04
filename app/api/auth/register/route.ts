import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password, honeypot } = await req.json();

    // Server-side Bot Check
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json({ message: 'Bot detected' }, { status: 400 });
    }

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      points: 1, // Bonus point for signing up!
    });

    return NextResponse.json({ message: 'User registered successfully', user: { id: newUser._id, name: newUser.name, email: newUser.email, points: newUser.points || 0 } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
