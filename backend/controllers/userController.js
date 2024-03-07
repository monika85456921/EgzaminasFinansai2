const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")

//desc register a new user
//@route POST /api/users
//@acc PUBLIC

const registerUser = asyncHandler(async (req, res) => {
    const { firstname, email, password } = req.body;
    if (!firstname || !email || !password) {
      res.status(400);
      throw new Error("Incorrect information");
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("This user already exists");
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = await User.create({
      firstname,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        firstname: user.firstname,
        email: user.email,
        token: generateToken(user._id),
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error("user error");
    }
})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    })
}




module.exports= {
registerUser
}