import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getProducts);

export default router;