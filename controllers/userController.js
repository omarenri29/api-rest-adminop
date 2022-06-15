import User from "../models/User.js";
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  //Validar si hay errores    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const filter = {};
    const users = await User.find(filter);

    if (!users) {
      return res.status(400).json({ msg: 'No existe ningun Usuario' })
    }
    res.json({ users });

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Hubo un error' });
  }
};

const getUserById = async (req, res) => {
  //Validar si hay errores    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe' })
    }
    res.json({ user });

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Hubo un error' });
  }
};

const createUser = async (req, res) => {
  //Validar si hay errores    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }  

  const {email, password} = req.body;

  try {    
    const userExists = await User.findOne({email});
    if(userExists){
      const error = new Error('El usuario ya existe')
      return res.status(400).send({ msg: error.message });
    }

    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();
    res.json(savedUser); 
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Hubo un error' });
  }
};

const updateUser = async (req, res) => {
  //Validar si hay errores    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' })
    }
    user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    res.json({ user })
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Hubo un error' });
  }
};

const deleteUser = async (req, res) => {
  //Validar si hay errores    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }
    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Usuario eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Hubo un error' });
  }
};

export { getUsers, createUser, getUserById, updateUser, deleteUser };
