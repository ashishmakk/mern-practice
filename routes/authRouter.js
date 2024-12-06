import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/authControllers.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/register").post(validateRegisterInput, registerUser);
router.route("/login").post(validateLoginInput, loginUser);
router.route("/logout").get(logout);

export default router;
