import jwt from 'jsonwebtoken';
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { BadRequestError } from '../errors';

export const addProduct = async (req: Request, res: Response) => {
  const { name, specs } = req.body;
  const token = req.cookies.token;

  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
  const companyId = decodedToken.companyId;

  const product: any = await Product.create({
    name,
    specs,
    company: companyId,
  });

  res.status(StatusCodes.OK).json({
    product: {
      name: product.name,
      specs: product.specs,
      company: product.company,
    },
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.prodId;

  const deletedProduct = await Product.findOneAndDelete({ _id: productId });

  res.status(StatusCodes.OK).json({ msg: 'product deleted', deletedProduct });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, specs } = req.body;
  const productId = req.params.prodId;

  if (!name || !specs || !productId) {
    throw new BadRequestError('please provide all values');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new BadRequestError('Product not found');
  }

  product.name = name;
  product.specs = specs;

  await product.save();

  res.status(StatusCodes.OK).json({ product });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({ products });
};

export const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.prodId;

  const product = await Product.findById(productId);

  res.status(StatusCodes.OK).json({ product });
};
