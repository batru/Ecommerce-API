import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';

const OrderItem = sequelize.define('order_item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qty: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
});

// Define the association
// User.hasMany(Review);

export default OrderItem;
