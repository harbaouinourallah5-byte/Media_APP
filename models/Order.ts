import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  experienceRating: { type: Number, min: 1, max: 5 },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  pointsEarned: { type: Number, default: 0 },
  pointsStatus: { type: String, enum: ['none', 'pending', 'approved', 'rejected'], default: 'none' },
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
