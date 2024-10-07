import { Request, Response } from 'express';
import Product from '../models/product';

// for handling addding of new product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
};

//for fetching all products with pagination, default: 1 page with 10 products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; //product limit per page
    const skip = (page - 1) * limit; //products to skip

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      itemsPerPage: limit
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};