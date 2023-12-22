const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder } = require('../controller/order');

const router = express.Router();

router.post('/', createOrder)
      .get('/:id', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder);


exports.router = router;