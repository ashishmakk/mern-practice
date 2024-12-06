import { UnauthorizedError } from "../errors/customErrors.js";

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("access denied");
    }

    next();
  };
};
