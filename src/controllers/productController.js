import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//get all products
const getProducts = asyncHandler(async (req, res) => {

  //pagination
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 2


  //number of products to skip
  const offset = (page - 1) * pageSize;

 

  try {
     //get the total count of the products in db
  const { count, rows: products }= await Product.findAndCountAll({
    limit: pageSize,
    offset: offset,
  })

  res.status(200).json({
    totalItems: count,
    currentPage: page,
    pageSize: pageSize,
    totalPages: Math.ceil(count / pageSize),
    products: products,
  })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error
    })
  }

  
  
});

//get products by id
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (product) {
    return res.json(product);
  } else {
    res.status(400).json({
      message: 'Resource not found',
    });
  }
});

//crete Product
const createProduct = asyncHandler(async (req, res) => {
  //get body data
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  //save the product details in db
  const product = await Product.create({
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
    userId: req.user.id,
  });
  if (product) {
    //send back user data
    res.status(201).json({
      product,
    });
  } else {
    res.status(400).json({ message: 'invalid product data' });
  }
});

//update Product
const updateProduct = asyncHandler(async (req, res) => {
  //get body data
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  //check if product exists
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.description = req.body.description;
    product.countInStock = req.body.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ msg: 'Resource not found' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (product) {
    await Product.destroy({ where: { id: product.id } });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ msg: 'product not found' });
  }
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
