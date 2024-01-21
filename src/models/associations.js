import User from './userModel.js';
import Product from './productModel.js';
import Order from './orderModel.js';
import OrderItem from './orderItem.js';
import ShippingAddress from './shippingAddress.js';
// import Review from './reviewModel.js';

//Association between user and orderitem
User.hasMany(OrderItem); // A user can have many order items
OrderItem.belongsTo(User); // An order item belongs to a user

//Association between product and orderItem
// Product.hasMany(OrderItem); // A product can be part of many order items
//OrderItem.belongsTo(Product); // An order item belongs to a single product

//Associations between order model and orderitem model
Order.hasMany(OrderItem); // An order can have many order items
OrderItem.belongsTo(Order); // An order item belongs to a single order

//User.hasMany(Review);
Product.belongsTo(User);
Order.belongsTo(User);
User.hasMany(Order);

//association between shipping address and order
ShippingAddress.belongsTo(Order); // A shiiping address belongs to a single order

//Product.hasMany(Review);
// Review.belongsTo(User);
// Review.belongsTo(Product);

export { User, Product, Order, OrderItem };
