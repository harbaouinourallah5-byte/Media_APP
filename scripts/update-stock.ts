import { connect } from 'mongoose';
import dbConnect from './lib/mongodb';
import Product from './models/Product';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function run() {
  await dbConnect();
  await Product.updateMany({}, { stock: 5 });
  const p = await Product.findOne();
  console.log('Updated stock. Current stock:', p?.stock);
  process.exit(0);
}

run();
