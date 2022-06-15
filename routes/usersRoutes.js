import express from "express";
import User from "../models/User.js";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
import checkRole from "../middleware/checkRole.js";
import checkSameUser from "../middleware/checkSameUser.js";
import logReqRes from "../middleware/logReqRes.js";
const usersRouter = express.Router();

usersRouter.get("/", checkRole(['admin', 'superadmin']), checkAuth, getUsers);
usersRouter.get("/:id", checkSameUser, checkAuth, getUserById);
usersRouter.post("/", logReqRes, checkRole(['superadmin']), checkAuth, createUser);
usersRouter.put("/:id", checkRole(['admin', 'superadmin']), checkAuth, updateUser);
usersRouter.delete("/:id", checkRole(['admin', 'superadmin']), checkAuth, deleteUser);

export default usersRouter;
 