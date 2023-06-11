import express from 'express';
import {
  registerCompany,
  loginCompany,
  getCurrentCompany,
  updateCompany,
  logoutCompany,
} from '../controllers/companyController';
import productRoutes from './productRoutes'
import authenticateCompany from '../middleware/auth'

const router = express.Router();

router.use('/product', authenticateCompany ,productRoutes);

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/', authenticateCompany, getCurrentCompany);
router.patch('/update', authenticateCompany, updateCompany);
router.get('/logout', logoutCompany);

export default router;
