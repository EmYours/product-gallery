import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    category: { type: String, required: true, trim: true, maxlength: 50 },
    price: { type: Number, required: true, min: 0 },
    material: { type: String, required: true, trim: true, maxlength: 100 },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true },
);

export default mongoose.model('Product', productSchema);
