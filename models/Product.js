import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  salePrice: Number,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock',
  },
  sku: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  attributes: {
    size: String,
    color: String,
  },
  image: String,
  gallery: [String],
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;