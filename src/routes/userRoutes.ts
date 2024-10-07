import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/users/:userId/purchases', userController.recordPurchase);
router.get('/users/:userId/recommendations', userController.getRecommendations);

export default router;