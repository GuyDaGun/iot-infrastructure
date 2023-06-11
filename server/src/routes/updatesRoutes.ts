import express from 'express';
import {
  addUpdate,
  getLastUpdates,
  deleteUpdate
} from '../controllers/updatesController';

const router = express.Router({mergeParams: true});

router.post('/', addUpdate);
router.delete('/:updateId', deleteUpdate);
router.get('/:numOfUpdates', getLastUpdates);

export default router;
