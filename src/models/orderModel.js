import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  isPaid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  paidAt: {
    type: Sequelize.DATE,
  },
  isDelivered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deliveredAt: {
    type: Sequelize.DATE,
  },
});

export default Order;
