import express from "express";
import UserController from "../controllers/user.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { userModel } from "../models/user.js";
import UserService from "../services/user.js";

const router = new express.Router();
const userService = new UserService(userModel.user);
const userController = new UserController(userService);
const authMiddleware = new AuthMiddleware(userService);

router.use(authMiddleware.authenticate);

router.get("/api/users", userController.findAll);
router.get(
  "/api/users/by-identity/:identityNumber",
  userController.findByIdentityNumber
);
router.get(
  "/api/users/by-account/:accountNumber",
  userController.findByAccountNumber
);
router.patch("/api/users/update", userController.update);
router.delete("/api/users/delete", userController.remove);

export { router };
