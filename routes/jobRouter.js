import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobControllers.js";
import {
  validateJobId,
  validateJobInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateJobId, getJob)
  .patch(validateJobId, validateJobInput, updateJob)
  .delete(validateJobId, deleteJob);

export default router;
