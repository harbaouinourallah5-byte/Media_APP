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
      '/products/pink-kit/media_1785886868636.jpg', // New Face Photo
      '/products/pink-kit/media_1785886067461.jpg',
      '/products/pink-kit/media_1785886066740.jpg',
      '/products/pink-kit/media_1785886066640.jpg',
      '/products/pink-kit/media_1785886066580.jpg',
      '/products/pink-kit/media_1785886066375.jpg',
      '/products/pink-kit/media_1785886572293.jpg',
      '/products/pink-kit/media_1785886572181.jpg',
      '/products/pink-kit/media_1785886572171.jpg',
      '/products/pink-kit/media_1785886564422.jpg',
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
