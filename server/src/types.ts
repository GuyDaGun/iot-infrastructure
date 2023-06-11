import {Request} from 'express'

export interface MyRequest extends Request {
    company?: {
      companyId: string,
    }
}