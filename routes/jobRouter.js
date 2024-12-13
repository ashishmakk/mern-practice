import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  getStats,
  updateJob,
} from "../controllers/jobControllers.js";
import {
  validateJobId,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, createJob);

router.route('/stats').get(getStats)

router
  .route("/:id")
  .get(checkTestUser, validateJobId, getJob)
  .patch(checkTestUser, validateJobId, validateJobInput, updateJob)
  .delete(checkTestUser, validateJobId, deleteJob);

export default router;
