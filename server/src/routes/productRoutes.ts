import express from 'express';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProduct,
} from '../controllers/productController';
import iotRoutes from './iotRoutes';


const router = express.Router();

router.use('/:prodId/iot', iotRoutes);

router.post('/add-product', addProduct);
router.delete('/delete-product/:prodId', deleteProduct);
router.patch('/update-product/:prodId', updateProduct);
router.get('/', getAllProducts);
router.get('/get-product/:prodId', getProduct);

export default router;
