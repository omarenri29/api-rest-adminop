import Rol from "../models/Rol.js";

const getRoles = async (req, res) => {
  const roles = await Rol.find();
  res.json(roles);
};

const getRolById = async (req, res) => {
  const { id } = req.params;
  const rol = await Rol.findById(id);
  res.json(rol);
};
const addRol = async (req, res) => {
  const { name, title, permissions } = req.body;
  if (!name || !title || !permissions) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  const rol = new Rol({
    name,
    title,
    permissions,
  });
  await rol.save();
  res.json({
    message: "Rol saved successfully",
  });
};
const updateRol = async (req, res) => {
  const { id } = req.params;
  const { name, title, permissions } = req.body;
  if (!name || !title || !permissions) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  const rol = {
    name,
    title,
    permissions,
  };
  await Rol.findByIdAndUpdate(id, rol, { new: true });
  res.json({
    message: "Rol updated successfully",
  });
};
export { getRoles, getRolById, addRol, updateRol };
