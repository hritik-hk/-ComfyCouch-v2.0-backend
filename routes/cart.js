const express = require('express');
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controller/cart');

const router = express.Router();

router.post('/', addToCart)
      .get('/:id', fetchCartByUser)
      .delete('/:id', deleteFromCart)
      .patch('/:id', updateCart)


exports.router = router;