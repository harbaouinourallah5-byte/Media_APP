import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or code' }, { status: 400 });
    }

    // Check if code matches
    if (user.resetCode !== code) {
      return NextResponse.json({ message: 'Invalid code' }, { status: 400 });
    }

    // Check if code is expired
    if (!user.resetCodeExpiry || user.resetCodeExpiry < new Date()) {
      return NextResponse.json({ message: 'Code has expired. Please request a new one.' }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    // Clear the reset code
    user.resetCode = null;
    user.resetCodeExpiry = null;
    
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully!' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
