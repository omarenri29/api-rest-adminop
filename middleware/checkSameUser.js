import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const checkSameUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRETA);
            const { id } = decoded;
            const user = await User.findById(id);            
            //Validar tipo de usuario
            //Si es admin o superadmin pasa
            if (user.role !== 'user') next();
            //Valiar si el usuario que está haciendo la petición es igual al id que recibimos como parametro
            //Un usuario solo puede ver sus propios datos            
            if (user._id.toString() !== req.params.id) {
                return res.status(404).json({ msg: "No puedes consultar los datos de otro usuario" });
            }
            next();
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ msg: "Error al validar permisos" });
        }
    }
}


export default checkSameUser;