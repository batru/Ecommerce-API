import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//create a protect function
const protect = asyncHandler(async (req, res, next) => {
  //get token from cookie
  let token;

  token = req.cookies.jwt;

  if (token) {
    //verify and decode token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //set the user to req.user
      req.user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: decoded.userId,
        },
      });

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: 'not authorized, token failed' });
    }
  } else {
    res.status(401).json({ msg: 'not authorized, no token' });
  }
});

//user must be admin
const admin = asyncHandler(async (req, res, next) => {
  //check if user is admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ msg: 'not authorized as admin' });
  }
});

export { protect, admin };
