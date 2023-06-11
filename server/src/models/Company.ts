import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  EmailSchemaType,
  AddressSchema,
  ContactSchema,
  PaymentSchema,
  Company,
} from './Types';

const CompanySchema = new mongoose.Schema<Company>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  } as EmailSchemaType,
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
    select: false,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  contacts: [ContactSchema],
  payments_info: [PaymentSchema],
});

CompanySchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
}

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

CompanySchema.methods.createJWT = function () {
  return jwt.sign({ companyId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

CompanySchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model('Company', CompanySchema);
