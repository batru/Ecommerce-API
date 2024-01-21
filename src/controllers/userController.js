import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken.js';
//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({ msg: 'invalid credentials' });
  }
  //check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'invalid credentials' });
  }
  //call generate token
  generateToken(res, user.id);
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

//register user
const registerUser = asyncHandler(async (req, res) => {
  //get body data
  const { name, email, password } = req.body;

  const userExists = await User.findOne({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return res.status(400).json({ message: 'User already registered' });
  }
  //hash password
  // generate a salt
  const salt = await bcrypt.genSalt(10);
  //hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  //save the user details in db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    //generate token
    generateToken(res, user.id);

    //send back user data
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json({ message: 'invalid user data' });
  }
});

//get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user; // here

  if (!user) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // generate a salt
      const salt = await bcrypt.genSalt(10);
      //hash password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

//get all Users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

//get user by id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user) {
    return res.json(user);
  } else {
    res.status(400).json({
      message: 'Resource not found',
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (user) {
    if (user.isAdmin) {
      res.status(400).send('Can not delete admin user');
    }
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.json({ message: 'User removed' });
  } else {
    res.status(404).send('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).send('User not found');
  }
});

export {
  getUsers,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUser,
};
