import mongoose from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
  pointsCost?: number;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  pointsCost: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
