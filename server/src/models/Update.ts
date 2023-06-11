import mongoose from 'mongoose'

const UpdateSchema = new mongoose.Schema({
    update: {
      type: Object,
      required: [true, 'Please provide data'],
    },
    iot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IOT',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export default mongoose.model('Update', UpdateSchema);