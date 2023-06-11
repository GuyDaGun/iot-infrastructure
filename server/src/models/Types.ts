import mongoose from 'mongoose';

/********************* COMPANY ***********************/

export type Company = {
  name: string,
  email:EmailSchemaType,
  password: string,
  address: Address,
  contacts: [Contact],
  payments_info: [Payment],
}

export interface EmailSchemaType extends mongoose.SchemaTypeOptions<any> {
  validate?: {
    validator: (value: any) => boolean;
    message: string;
  };
}

export type Address = {
  country: string;
  city: string;
  street: string;
  postal_code: number;
};

export const AddressSchema = new mongoose.Schema<Address>({
  country: { type: String },
  city: { type: String },
  street: { type: String },
  postal_code: { type: Number },
});

export type Contact = {
  name: string;
  email: string;
  phone: string;
};

export const ContactSchema = new mongoose.Schema<Contact>({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

export type Payment = {
  credit_card: string;
  expiration_date: string;
  cvv: number;
  is_company: boolean;
};

export const PaymentSchema = new mongoose.Schema<Payment>({
  credit_card: { type: String },
  expiration_date: { type: String },
  cvv: { type: Number },
  is_company: { type: Boolean },
});

/********************* PRODUCT ***********************/

type Specs = {
  price: number;
  category: string;
  weight: number;
};

export const SpecsSchema = new mongoose.Schema<Specs>({
  price: { type: Number },
  category: { type: String },
  weight: { type: Number },
});


/********************* IOT ***********************/

export type Owner = {
  name: string;
  email: string;
  phone: string;
  address: Address;
};

export const OwnerSchema = new mongoose.Schema<Owner>({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: AddressSchema },
});
