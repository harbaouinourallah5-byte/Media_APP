import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'If this email exists, a code has been sent.' }, { status: 200 });
    }

    // Generate a 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 15 minutes from now
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    user.resetCode = resetCode;
    user.resetCodeExpiry = resetCodeExpiry;
    await user.save();

    // Use real Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL || 'medinabeauty133@gmail.com',
        pass: (process.env.SMTP_PASSWORD || 'cjae wken nncy idos').replace(/["\s]/g, ''),
      },
    });

    const info = await transporter.sendMail({
      from: '"Medina Beauty Support" <medinabeauty133@gmail.com>',
      to: email,
      subject: "Your Password Reset Code",
      text: `Your password reset code is: ${resetCode}\n\nIt will expire in 15 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w-md; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">Medina Beauty</h2>
          <p>We received a request to reset your password. Use the code below to reset it:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; letter-spacing: 5px; color: #000;">${resetCode}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">This code will expire in 15 minutes.</p>
        </div>
      `,
    });

    console.log(`\n\n=========================================\n`);
    console.log(`📧 REAL EMAIL SENT to ${email}!`);
    console.log(`\n=========================================\n\n`);

    return NextResponse.json({ message: 'If this email exists, a code has been sent.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
