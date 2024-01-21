import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';

const ShippingAddress = sequelize.define('shipping_address', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  postalCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

});



export default ShippingAddress;
