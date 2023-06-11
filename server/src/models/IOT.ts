import { PaymentSchema, OwnerSchema } from './Types';
import mongoose from 'mongoose'



const IOTSchema = new mongoose.Schema({
    owner: {
      type: OwnerSchema,
      required: [true, 'Please provide Owner details'],
    },
    payments_info: [PaymentSchema],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
});

export default mongoose.model('IOT', IOTSchema);