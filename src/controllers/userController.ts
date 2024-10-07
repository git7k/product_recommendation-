import { Request, Response } from 'express';
import Purchase from '../models/purchase';
import * as recommendationService from '../services/recommendationService';
import Product from '../models/product';


//for recording a purchase
export const recordPurchase = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    /* comeback on this later
     const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
      }*/
  
    const newPurchase = new Purchase({ userId, productId });
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    res.status(400).json({ message: "Error recording purchase", error });
  }
};

//for getting product recommendation
export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const recommendations = await recommendationService.getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting recommendations", error });
  }
};