import { app } from "../index.js";
import supertest from "supertest";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const api = supertest(app);
const passwordHash = await bcrypt.hash("123456", 10);
const initialUsers = [
  {
    name: "Juan",
    email: "juan@gmail.com",
    password: passwordHash,
    rol: "62819985f6fd1464226f3dce",
  },
  {
    name: "Pedro",
    email: "pedro@gmail.com",
    password: passwordHash,
    rol: "62819985f6fd1464226f3dce",
  },
];
const initialRoles = [
  {
    name: "Admin",
    title: "Admin",
    permissions: [
      { permission: "readWrite", db: "accounts" },
      { permission: "read", db: "user" },
    ],
  },
  {
    name: "SuperAdmin",
    title: "Super Admin",
    permissions: [
      { permission: "readWrite", db: "accounts" },
      { permission: "read", db: "user" },
    ],
  },
];
const getAllRoles = async () => {
  const roles = await Rol.find({});
  return roles.map((rol) => rol.toJSON());
};

const getAllUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { api, initialUsers, getAllUsers, getAllRoles, initialRoles };
