import Role from "../models/Role.js";

const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

const getRolById = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);
  res.json(role);
};
const addRol = async (req, res) => {
  const { name, title, permissions } = req.body;
  if (!name || !title || !permissions) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  const role = new Role({
    name,
    title,
    permissions,
  });
  await role.save();
  res.json({
    message: "Role saved successfully",
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
  const role = {
    name,
    title,
    permissions,
  };
  await Role.findByIdAndUpdate(id, role, { new: true });
  res.json({
    message: "Role updated successfully",
  });
};
export { getRoles, getRolById, addRol, updateRol };
