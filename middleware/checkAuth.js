import jwt from "jsonwebtoken";
import User from "../models/User.js";
const { JWT_SECRETA } = process.env;

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            let decoded;
            try {
                decoded = jwt.verify(token, JWT_SECRETA);
            } catch (error) {
                console.log(error.message)
                return res.status(400).json({ msg: "Token expiró" });
            }
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
