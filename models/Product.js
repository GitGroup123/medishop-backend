import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["simple", "variable"], default: "simple" }, 
  description: String,
  price: { type: Number, required: true },
  salePrice: Number,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock',
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  attributes: {
    size: String,
    color: String,
  },
  image: String,
  gallery: [String],
   variations: [
    {
      sku: String,
      barcode: String,
      price: Number,
      salePrice: Number,
      stock: Number,
      image: String,
      stockStatus: {
        type: String,
        enum: ['in_stock', 'out_of_stock', 'backorder'],
        default: 'in_stock'
      },
       attributes: mongoose.Schema.Types.Mixed,
    }]
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;