import express from "express";
import UserService from "../services/user.js";
import UserController from "../controllers/user.js";
import AuthService from "../services/auth.js";
import AuthController from "../controllers/auth.js";
import { userModel } from "../models/user.js";

const userService = new UserService(userModel.user);
const authService = new AuthService(userModel.user);
const userController = new UserController(userService);
const authController = new AuthController(authService);

const publicRouter = new express.Router();
publicRouter.post("/api/users/registration", (req, res, next) =>
  userController.registration(req, res, next)
);
publicRouter.post("/api/users/login", (req, res, next) =>
  authController.login(req, res, next)
);

export { publicRouter };
