import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';
//import Review from './reviewModel.js';
const User = sequelize.define('user', {
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
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define the association
// User.hasMany(Review);

export default User;
