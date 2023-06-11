import IOT from '../models/IOT';
import {  StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { BadRequestError } from '../errors';

export const addIOT = async (req: Request, res: Response) => {
  const { owner, payments_info } = req.body;
  const productId = req.params.prodId;

  if (!owner || !payments_info || !productId) {
    throw new BadRequestError('please provide all values');
  }

  const iot: any = await IOT.create({
    owner,
    payments_info,
    product: productId,
  });

  res.status(StatusCodes.OK).json({ iot });
};

export const deleteIOT = async (req: Request, res: Response) => {
  const iotId = req.params.iotId;

  if (!iotId) {
    throw new BadRequestError('please provide IOT ID');
  }

  const deletedIOT = await IOT.findOneAndDelete({ _id: iotId });

  res.status(StatusCodes.OK).json({ msg: 'iot deleted', deletedIOT });
};

export const updateIOT = async (req: Request, res: Response) => {
  const { owner, payments_info } = req.body;
  const iotId = req.params.iotId;

  if (!owner || !payments_info || !iotId) {
    throw new BadRequestError('please provide all values');
  }

  const iot = await IOT.findById(iotId);

  if (!iot) {
    throw new BadRequestError('Product owner not found');
  }

  iot.owner = owner;
  iot.payments_info = payments_info;

  await iot.save();

  res.status(StatusCodes.OK).json({ iot });
};

export const getAllIOTs = async (req: Request, res: Response) => {
    const productId = req.params.prodId;

    if (!productId) {
        throw new BadRequestError('Please provide product id');
    }

    const iots = await IOT.find({product: productId});

    res.status(StatusCodes.OK).json({iots});
};

export const getIOT = async (req: Request, res: Response) => {
    const iotId = req.params.iotId;

    if (!iotId) {
        throw new BadRequestError('Please provide owner id');
    }

    const owner = await IOT.findById(iotId);

    if (!owner) {
        throw new BadRequestError('Owner was not found, please enter a valid id');
    }

    res.status(StatusCodes.OK).json({owner});
};
