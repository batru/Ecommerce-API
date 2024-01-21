import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';

import User from './src/models/userModel.js';
import sequelize from './src/utils/db.js';
import Product from './src/models/productModel.js';
import products from './data/products.js';

dotenv.config();
//connectDB
sequelize
  .authenticate()
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    await User.destroy({ where: {} });
    await Product.destroy({ where: {} });
    const createdUsers = await User.bulkCreate(users);

    const adminUser = createdUsers[0].id;
    console.log(adminUser);
    const sampleProducts = products.map((product) => {
      return { ...product, userId: adminUser };
    });
    console.log(sampleProducts);

    await Product.bulkCreate(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.destroy({ where: {} });
    await Product.destroy({ where: {} });
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
