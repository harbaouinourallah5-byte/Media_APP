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

const addImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    
    const images = [
      '/products/pink-kit/media_1785883976716.jpg',
      '/products/pink-kit/media_1785883976718.jpg',
      '/products/pink-kit/media_1785877762618.jpg',
      '/products/pink-kit/media_1785877762621.jpg',
      '/products/pink-kit/media_1785877762625.jpg',
      '/products/pink-kit/media_1785877762815.jpg',
    ];

    await Product.updateOne(
      { name: "Medina Beauty – Pink Essentials Kit" },
      { 
        $set: { 
          image: images[0],
          images: images 
        } 
      }
    );
    
    console.log("Added images to Medina Beauty – Pink Essentials Kit.");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

addImages();
