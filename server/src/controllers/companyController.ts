import Company from "../models/Company";
import {StatusCodes} from 'http-status-codes';
import attachCookies from '../utils/attachCookies';
import {Request, Response} from 'express';
import { BadRequestError, UnAuthenticatedError } from '../errors';
import { MyRequest } from '../types';


export const registerCompany = async (req: Request, res: Response) => {    
    const {name, email, password, address, payments_info, contacts} = req.body;

    if (!name || !email || !password || !address || !payments_info || !contacts) {
        throw new BadRequestError('please provide all values');
    }

    const companyAlreadyExists = await Company.find({email});
    
    
    if (companyAlreadyExists.length) {
        throw new BadRequestError('Email already in use');
    }

    const company: any = await Company.create({ name, email, password, address, payments_info, contacts });

    const token = company.createJWT();

    attachCookies({ res, token });

    res.status(StatusCodes.OK).json({
        company: {
          email: company.email,
          address: company.address,
          payments_info: company.payments_info,
          name: company.name,
          contacts: company.contacts,
        },
      });
}

export const loginCompany = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('please provide all values');
  }

  const company: any = await Company.findOne({ email }).select('+password');
  
  if (!company) {
    throw new UnAuthenticatedError('User not Authorized');
  }

  console.log(company);

  const token = company.createJWT();

  company.password = undefined;

  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({ company });
}

export const updateCompany = async (req: MyRequest, res: Response) => {
  const {name, email, address, payments_info, contacts} = req.body;

  if (!name || !email || !address || !payments_info || !contacts) {
      throw new BadRequestError('please provide all values');
  }

  const company: any = await Company.findOne({ _id: req.company.companyId });

  company.email = email;
  company.name = name;
  company.address = address;
  company.payments_info = payments_info;
  company.contacts = contacts;

  await company.save();

  const token = company.createJWT();

  attachCookies({res, token});

  res.status(StatusCodes.OK).json({company});
}

export const getCurrentCompany = async (req: MyRequest, res: Response) => {
  const company = await Company.findOne({ _id: req.company.companyId });
  res.status(StatusCodes.OK).json({ company });
}

export const logoutCompany = async (req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'User Logged Out' });
}

