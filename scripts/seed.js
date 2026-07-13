const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://harbaouinourallah5_db_user:hJu3x9ddzPX1a9Lf@cluster0.rnmezdf.mongodb.net/beautyDB?appName=Cluster0";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const seedProducts = [
  {
    name: 'Luminous Glow Serum',
    description: 'A luxurious serum that enhances your natural radiance.',
    price: 65,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    stock: 50
  },
  {
    name: 'Mediterranean Rose Water',
    description: 'Refreshing facial mist made from organic damask roses.',
    price: 32,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
    stock: 120
  },
  {
    name: 'Velvet Matte Lipstick',
    description: 'Long-lasting lipstick with a smooth, velvety finish.',
    price: 28,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    stock: 200
  },
  {
    name: 'Golden Sands Bronzer',
    description: 'Sun-kissed glow all year round.',
    price: 45,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800',
    stock: 75
  },
  {
    name: 'Olive Oil Hair Mask',
    description: 'Deep conditioning treatment for silky smooth hair.',
    price: 38,
    category: 'Haircare',
    image: 'https://images.unsplash.com/photo-1608280540608-23214c77607a?auto=format&fit=crop&q=80&w=800',
    stock: 60
  },
  {
    name: 'Jasmine Bloom Perfume',
    description: 'A delicate and enchanting floral fragrance.',
    price: 85,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800',
    stock: 40
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(seedProducts);
    console.log('Seeded the database with premium products!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
