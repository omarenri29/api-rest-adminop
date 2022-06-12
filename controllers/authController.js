import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

const authenticateUser = async (req, res) => {
  //Validar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }
    res.json({ token: generarJWT(user.id) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};
export { authenticateUser };
