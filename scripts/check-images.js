import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  images: [String],
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const checkImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const p = await Product.findOne({ name: /Pink Essentials/i });
    console.log(JSON.stringify(p.images, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

checkImages();
