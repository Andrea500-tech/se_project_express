const User = require("../models/user"); // import your User model
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors"); // import your error constants

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message })
    );
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((foundUser) => res.status(200).send(foundUser))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
