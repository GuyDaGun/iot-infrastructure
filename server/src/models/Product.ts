import mongoose from 'mongoose';
import {SpecsSchema} from './Types'


const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxLength: 20,
    trim: true,
  },
  specs: {
    type: SpecsSchema,
    required: [true, 'Please provide specs for this product'],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  }
});

export default mongoose.model('Product', ProductSchema);
