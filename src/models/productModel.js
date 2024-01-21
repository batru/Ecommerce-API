import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';

const Product = sequelize.define('product', {
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
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  countInStock: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

// Define the association
// Product.belongsTo(User);
// Product.hasMany(Review);
export default Product;
