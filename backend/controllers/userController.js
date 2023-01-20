const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Regiter a User
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
        public_id : "this is a sample id",
        url : "profilepicUrl"
    },
  });

  const token = user.getJWTToken();

  sendToken(user, 201, res);
};


// Login User
exports.loginUser = async (req, res, next) => {

  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({
      success: false,
      message: "Please Enter Email & Password",
    });
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isPasswordMatched = user.comparePassword(password);

  if(!isPasswordMatched){
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  sendToken(user, 200, res);
}
