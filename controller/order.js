const { Order } = require("../model/order");
const { Variant } = require("../model/variant");

exports.fetchOrdersByUser = async (req, res) => {
    const { id } = req.user;
    try {
      const orders = await Order.find({ user: id });
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.createOrder = async (req, res) => {
    const order = new Order(req.body);

    //update stocks;
    for(let item of order.cartItems){
       let product =  await Variant.findOne({_id:item.variantID});
       product.$inc('stock',-1*item.quantity);
       await product.save();
    }

    try {
      const doc = await order.save();
       // TODO for me: add functionality for notifying user by mailing
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
