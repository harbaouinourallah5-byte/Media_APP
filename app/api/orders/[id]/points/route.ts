import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { action } = await req.json(); // 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    await dbConnect();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    if (order.pointsStatus !== 'pending') {
      return NextResponse.json({ message: 'Points are not pending for this order' }, { status: 400 });
    }

    if (action === 'approve') {
      order.pointsStatus = 'approved';
      
      // Give points to the user
      if (order.user && order.pointsEarned > 0) {
        const user = await User.findById(order.user);
        if (user) {
          user.points = (user.points || 0) + order.pointsEarned;
          await user.save();
        }
      }
    } else if (action === 'reject') {
      order.pointsStatus = 'rejected';
    }

    await order.save();

    return NextResponse.json({ 
      success: true, 
      message: `Points ${action}d successfully.`, 
      order 
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
