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

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const images = [
      '/trousse.jpg',
      '/products/pink-kit/media_1785883976716.jpg',
      '/products/pink-kit/media_1785883976718.jpg',
      '/products/pink-kit/media_1785877762618.jpg',
      '/products/pink-kit/media_1785877762621.jpg',
      '/products/pink-kit/media_1785877762625.jpg',
      '/products/pink-kit/media_1785877762815.jpg',
      '/products/pink-kit/media_1785885154910.jpg',
      '/products/pink-kit/media_1785885154922.jpg',
    ];

    const result = await Product.updateMany(
      { name: { $regex: /Pink Essentials/i } },
      { 
        $set: { 
          image: images[0],
          images: images 
        } 
      }
    );
    
    console.log("Update result:", result);
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

fixImages();
