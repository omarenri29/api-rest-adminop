import express from "express";
import User from "../models/User.js";
import {
  getUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const usersRouter = express.Router();

usersRouter.get("/", checkAuth, getUsers);

usersRouter.get("/:id", checkAuth, getUserById);
usersRouter.post("/", checkAuth, addUser);

usersRouter.put("/:id", checkAuth, updateUser);

usersRouter.delete("/:id", checkAuth, deleteUser);

export default usersRouter;
