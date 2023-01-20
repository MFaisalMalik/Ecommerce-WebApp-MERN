const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAunthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if( !token ){
    return res.status(401).json({
        success: false,
        message: "Please Login to access this resource",
      });
  }

  const decodedData = jwt.verify(token, procees.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  next();
};
