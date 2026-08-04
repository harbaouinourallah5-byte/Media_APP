const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb://harbaouinourallah5_db_user:hJu3x9ddzPX1a9Lf@ac-fyzkz2i-shard-00-00.rnmezdf.mongodb.net:27017,ac-fyzkz2i-shard-00-01.rnmezdf.mongodb.net:27017,ac-fyzkz2i-shard-00-02.rnmezdf.mongodb.net:27017/beautyDB?ssl=true&replicaSet=atlas-1lgw8a-shard-0&authSource=admin&appName=Cluster0";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@medinabeauty.com';
    const password = 'adminpassword123';
    
    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      existing.isAdmin = true;
      existing.password = await bcrypt.hash(password, 10);
      await existing.save();
      console.log('Updated existing admin account!');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name: 'Super Admin',
        email,
        password: hashedPassword,
        isAdmin: true,
        points: 9999
      });
      console.log('Created new admin account!');
    }
    
    console.log('Credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
