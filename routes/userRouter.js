import express from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userControllers.js";
import { validateUserUpdateInput } from "../middleware/validationMiddleware.js";
import { authorizedPermissions } from "../middleware/authorizedPermissions.js";
import upload from "../middleware/multerMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/update-user")
  .patch(
    checkTestUser,
    upload.single("avatar"),
    validateUserUpdateInput,
    updateUser
  );
router
  .route("/admin/app-stats")
  .get(authorizedPermissions("admin"), getAppStats);

export default router;
