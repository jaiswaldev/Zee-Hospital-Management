import express, { Router } from "express";

import { addProduct, getAllProducts, deleteProduct, updateProduct } from "../controller/AdminProductController.js";


const router = Router();

router.post('/', addProduct);
router.get('/', getAllProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
