import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  'root',
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

export default sequelize;

// module.exports = new Sequelize('ims', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     operatorsAliases: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   });
