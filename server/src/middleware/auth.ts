import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors';
import {Request, Response, NextFunction} from 'express';
import { MyRequest } from '../types';


const auth = async (req: MyRequest, res: Response, next: NextFunction) => {
  const token: string = req.cookies.token;

  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid!');
  }

  try {

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    let companyId: string;

    if (typeof payload === 'string') {
      companyId = payload;
    } else {
      companyId = payload.companyId;
    }

    req.company = { companyId };

    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
