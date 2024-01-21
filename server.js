import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import cors from 'cors';

//get the user model
// import User from './src/models/userModel.js';
// import Product from './src/models/productModel.js';
// import Review from './src/models/reviewModel.js';
//import Order from './src/models/orderModel.js';

import { User, Product, Order, OrderItem } from './src/models/associations.js';
//DATABASE
import sequelize from './src/utils/db.js';

import userRoute from './src/routes/userRoutes.js';
import productRoute from './src/routes/productRoutes.js';
import orderRoute from './src/routes/orderRoutes.js';
import stkRoute from './src/routes/stkRoutes.js'

//TEST DB
sequelize
  .authenticate()
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

//create tables through sync
sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
//initialize the express app
const app = express();

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('API is running..');
});

//body parser
app.use(express.json());
app.use(urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

//cors
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

//lipa na mpesa route
app.use('/api', stkRoute)


app.listen(port, () => console.log(`server running on port ${port}`));
