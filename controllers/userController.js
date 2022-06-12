import User from "../models/User.js";
import bcrypt from "bcrypt";
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

const addUser = (req, res) => {
  const { name, password, email, rol } = req.body;
  if (!name || !password || !email || !rol) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.send(err);
    } else {
      const newUser = new User({
        name,
        password: hash,
        email,
        rol,
      });
      newUser
        .save()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
};
const updateUser = (req, res) => {
  const { name, password, email, rol } = req.body;
  if (!name || !password || !email || !rol) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  const { id } = req.params;
  const newUser = {
    name,
    password: passwordHash,
    email,
    rol,
  };

  User.findByIdAndUpdate(id, newUser, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

export { getUsers, addUser, getUserById, updateUser, deleteUser };
