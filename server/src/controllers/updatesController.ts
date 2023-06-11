import Update from '../models/Update';
import {StatusCodes} from 'http-status-codes'
import {Request, Response} from 'express'
import { BadRequestError } from '../errors';


export const addUpdate = async (req: Request, res: Response) => {
    const {update} = req.body;
    const iotId = req.params.iotId;

    if (!update || !iotId) {
        throw new BadRequestError('please provide all values')
    }

    const newUpdate = await Update.create({
        update,
        iot: iotId
    });

    res.status(StatusCodes.OK).json({newUpdate});
} 

export const deleteUpdate = async (req: Request, res: Response) => {
    const updateId = req.params.updateId;

    const deletedUpdate = await Update.findByIdAndDelete({_id: updateId});

    res.status(StatusCodes.OK).json({msg: 'update was deleted', deletedUpdate});
}

export const getLastUpdates = async (req: Request, res: Response) => {
    const iotId = req.params.iotId;
    const numOfLastUpdates = req.params.numOfUpdates;

    if (!iotId || !numOfLastUpdates) {
        throw new BadRequestError('Please provide valid values');
    }

    const updates = await Update.find({iot: iotId}).sort({createdAt: -1}).limit(parseInt(numOfLastUpdates));
    
    res.status(StatusCodes.OK).json(updates);
}