import express from 'express';
import {
  addIOT,
  deleteIOT,
  updateIOT,
  getAllIOTs,
  getIOT
} from '../controllers/iotController';
import updatesRoutes from './updatesRoutes';

const router = express.Router({mergeParams: true});

router.use('/:iotId/updates', updatesRoutes);

router.post('/add-iot', addIOT);
router.delete('/delete-iot/:iotId', deleteIOT);
router.patch('/update-iot/:iotId', updateIOT);
router.get('/', getAllIOTs);
router.get('/:iotId', getIOT);

export default router;
