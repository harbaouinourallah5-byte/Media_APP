import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ProductSchema = new mongoose.Schema({
  name: String,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const deleteProduct = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI missing in .env.local");
    
    await mongoose.connect(mongoUri);
    console.log("Connected to DB");
    
    // Find products matching 'lunch'
    const result = await Product.deleteMany({ name: { $regex: 'lunch', $options: 'i' } });
    console.log(`Deleted ${result.deletedCount} product(s) matching "lunch".`);
    
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

deleteProduct();
