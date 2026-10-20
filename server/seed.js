import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import Product from './models/Product.js';

const products = [
  { name: 'Arco Lounge Chair', category: 'Furniture', price: 289, material: 'Bouclé / Oak', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85', description: 'A low, enveloping chair with a soft woven finish.' },
  { name: 'Dune Table Lamp', category: 'Lighting', price: 128, material: 'Ceramic / Linen', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'A gentle pool of light for bedside and reading corners.' },
  { name: 'Linea Side Table', category: 'Furniture', price: 195, material: 'Travertine', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85', description: 'A compact stone table with a quietly graphic silhouette.' },
  { name: 'Folded Vessel', category: 'Objects', price: 74, material: 'Stoneware', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85', description: 'Hand-finished vessel made for stems or open shelving.' },
  { name: 'Mira Floor Light', category: 'Lighting', price: 340, material: 'Steel / Glass', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=85', description: 'An adjustable floor light for long evening rituals.' },
  { name: 'Cove Bench', category: 'Furniture', price: 420, material: 'Ash / Wool', image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=900&q=85', description: 'A slender bench that brings warmth to entryways.' },
];

try {
  await connectDatabase();
  for (const product of products) {
    await Product.updateOne({ name: product.name }, { $set: product }, { upsert: true });
  }
  console.log(`${products.length} products are ready in MongoDB.`);
} catch (error) {
  console.error('Seeding failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
