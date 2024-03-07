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
//token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    })
}

//@desc login existing user
//@route POST /api/users/login
//@acc PRIVATE

const loginUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body;
  
const user = await User.findOne({ email });
  
if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
    id: user.id,
    firstname: user.firstname,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
      });
} else {
    res.status(400);
    throw new Error("Invalid email or password");
}
})

//@desc get A user
//route /api/users/user

const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

//@desc get ALL users
//@route 


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

//@desc update a user
//@route /api/users/:id

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { firstname, email, password } = req.body;
  
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
  
    user.firstname = firstname || user.firstname;
    user.email = email || user.email;
  
    if (password) {
      const salt = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();
  
    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
      role: updatedUser.role,
    })
})

//@desc delete user
//@ route /api/users/:id

const deleteUser = asyncHandler(async (req, res) => {
const userId = req.params.id;
  
const user = await User.findByIdAndDelete(userId);
  
if (!user) {
    res.status(400);
    throw new Error("user not found");
}
  
    res.json({ message: "user has been removed" });
});




module.exports= {
registerUser,
loginUser,
getUser,
getAllUsers,
updateUser,
deleteUser
}