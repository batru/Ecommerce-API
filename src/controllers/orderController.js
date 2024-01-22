import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import OrderItem from '../models/orderItem.js';
import ShippingAddress from '../models/shippingAddress.js';
import Product from '../models/productModel.js'
import sequelize from 'sequelize';

const addAddress = asyncHandler (async (req,res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!order) {
    return res.status(404).json({msg: 'No order to ship to'})
  }


  const { address, city, country , postalCode} = req.body

  //save the user details in db
  const shippingAddress = await ShippingAddress.create({
  address,
  city,
  country,
  postalCode,
  orderId: req.params.id
  });
  if (shippingAddress) {
   
    //send back user data
    res.status(201).json({
      shippingAddress
    });
  } else {
    res.status(400).json({ message: 'invalid shiipong address data' });
  }

})

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  //create order items

  const { orderItems } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).send('No order items');
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client

    //create order
    const order = new Order({ userId: req.user.id });

    const createdOrder = await order.save();


    // Get the ordered items from our database
const itemsFromDB = await Product.findAll({
  where: {
    id: { [sequelize.Op.in]: orderItems.map((x) => x.productId) },
  },
});

// Map over the order items and use the price from our items from the database
const dbOrderItems = orderItems.map((itemFromClient) => {
  const matchingItemFromDB = itemsFromDB.find(
    (itemFromDB) => itemFromDB.id === itemFromClient.productId
  );
  return {
    ...itemFromClient,
   
    price: matchingItemFromDB.price,
    userId: req.user.id, 
    orderId: createdOrder.id
  };
});

    // const orderdItems = orderItems.map((x) => {
    //   return { ...x, userId: req.user.id, orderId: createdOrder.id };
    // });

    //create order items
    // const itemsOrderd = new OrderItem(orderdItems);

    const itemsOrderd = await OrderItem.bulkCreate(dbOrderItems);

    res.status(201).json(itemsOrderd);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({ userId: req.user.id });
  const orderItems = await OrderItem.findAll({ where:{userId: req.user.id} });
  res.json({
    orders: orders,
    orderItems: orderItems,
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
    },
  });

  const orderItems = await OrderItem.findAll({ where: { orderId: req.params.id }, });

  if (order) {
    res.json({
      order: order,
      orderItems: orderItems,
    });
  } else {
    res.status(404).send('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).send('Order not found');
  }
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToDelivered, addAddress };
