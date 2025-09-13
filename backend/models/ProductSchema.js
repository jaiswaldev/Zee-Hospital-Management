import { mongoose, Schema } from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Diagnostic Tools',
      'Monitoring Devices',
      'Emergency Care',
      'Mobility Aids',
      'Medical Supplies',
      'Rehabilitation Equipment',
      'Others'
    ],
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: function () {
      return this.quantity > 0;
    }
  },
  totalSales: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
