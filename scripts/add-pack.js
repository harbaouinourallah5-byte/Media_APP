import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  pointsCost: Number,
  rating: Number,
  numReviews: Number,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const addPack = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI missing in .env.local");
    
    await mongoose.connect(mongoUri);
    console.log("Connected to DB");
    
    const newProduct = new Product({
      name: "Medina Beauty – Pink Essentials Kit",
      description: "✨ Includes:\n👜 Transparent Pink Makeup Bag\n🎁 Mini Makeup Bag\n💄 Concealer\n🌸 Blush\n💋 Gloss\n👁️ Mascara\n✏️ Lip Liner\n🧽 Beauty Blender\n🌷 Mini Perfume\n🎁 Surprise Gift\n💌 Thank You Card\n\n🚚 Delivery: 8 DT anywhere in Tunisia",
      price: 52,
      category: "Makeup",
      image: "/trousse.jpg",
      stock: 50,
      pointsCost: 200,
      rating: 5,
      numReviews: 0,
    });
    
    await newProduct.save();
    console.log("Successfully added Medina Beauty – Pink Essentials Kit!");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

addPack();
