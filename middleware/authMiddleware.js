import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid credentials");
  }
};

export const checkTestUser = async (req, res, next) => {
  const { userId, role } = req.user;

  if (userId === "675ad7ae54f8fab9cb9aa676") {
    throw new BadRequestError("Demo user. For viewing purpose only.");
  }
  next();
};
