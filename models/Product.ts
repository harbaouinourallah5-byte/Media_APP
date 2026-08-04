import mongoose from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  images?: string[];
  stock: number;
  featured: boolean;
  pointsCost?: number;
  rating?: number;
  numReviews?: number;
  reviews?: Array<{
    user: any;
    name: string;
    rating: number;
    comment: string;
    createdAt?: Date;
  }>;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  pointsCost: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
