import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const removePhoto = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    
    // Find the Pink Essentials Kit and remove its photo
    await Product.updateOne(
      { name: "Medina Beauty – Pink Essentials Kit" },
      { $set: { image: "" } } // Clear the image
    );
    
    console.log("Removed photo for Medina Beauty – Pink Essentials Kit.");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

removePhoto();
