import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const checkRole = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            console.log(req.params)
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRETA);           

            const { id } = decoded;
            const user = await User.findOne({ id });
            //Validar tipo de usuario
            //Si es admin pasa
            if(user.role)
            if (!user) {
                return res.status(404).json({ msg: "Usuario administrador no existe" });
            }
            const userRole = user.role;
            if (permissions.includes(userRole)) {
                next()
            } else {
                return res.status(401).json({ msg: "No cuentas con permisos para realizar esta operación" });
            }
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ msg: "Error al validar permisos" });
        }
    }
}


export default checkRole;