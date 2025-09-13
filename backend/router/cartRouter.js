import express from 'express';
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  getCartTotal 
} from '../controller/UserCartController.js';

import {protect } from '../middlewares/authenticateUser.middleware.js';

const router = express.Router();

router.get('/', protect, getCart);

// Add item to cart
// POST /api/cart/add
// Body: { productId, quantity }
router.post('/add', protect, addToCart);

// Update cart item quantity
// PUT /api/cart/update
// Body: { productId, quantity }
router.put('/update', protect, updateCartItem);

// Remove specific item from cart
// DELETE /api/cart/remove/:productId
router.delete('/remove/:productId', protect, removeFromCart);

// Get cart total and item count
// GET /api/cart/total
router.get('/total', protect, getCartTotal);

export default router;