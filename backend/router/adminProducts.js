import express, { Router } from "express";

import { addProduct, getAllProducts, deleteProduct, updateProduct } from "../controller/AdminProductController.js";


const router = Router();

router.get('/products', getAllProducts);
router.post('/addproduct', addProduct);
router.delete('/deleteproduct/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
