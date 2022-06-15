import jwt from "jsonwebtoken";
import User from "../models/User.js";
const { NODE_ENV } = process.env;

const checkAuth = async (req, res, next) => {
  // if (NODE_ENV === "development" || NODE_ENV === "test") {
  //   return next();
  // }
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRETA);
      req.user = await User.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      return res.status(400).json({ msg: "Token no valido" });
    }
  }

  if (!token) {
    const error = new Error("Token no valido");
    return res.status(401).json({ msg: error.message });
  }

  return next();
};

export default checkAuth;
