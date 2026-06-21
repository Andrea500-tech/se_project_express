const bcrypt = require("bcryptjs"); // for password hashing
const jwt = require("jsonwebtoken"); // for JWT token generation
const User = require("../models/user"); // your User model
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors"); // error constants
const { JWT_SECRET } = require("../utils/config");


// GET all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message })
    );
};

// CREATE a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10) // hash password with 10 salt rounds
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((newUser) =>
      res.status(201).send({
        _id: newUser._id,
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
        //  password intentionally excluded
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        // duplicate email error
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

// GET a single user by ID
const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((foundUser) =>
      res.status(200).send({
        _id: foundUser._id,
        name: foundUser.name,
        avatar: foundUser.avatar,
        email: foundUser.email,
        //  password intentionally excluded
      })
    )
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
   const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedUser) =>
      res.status(200).send({
        _id: updatedUser._id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        email: updatedUser.email,
      })
    )
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};
// LOGIN user
const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password) // custom static method in model
    .then((user) => {
      // create JWT with only _id in payload
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token }); // send token back to client
    })
    .catch(() => {
      res.status(UNAUTHORIZED).send({ message: "Incorrect email or password" });
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateUser };
