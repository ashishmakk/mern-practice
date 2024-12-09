import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

export const validationErrors = (values) => {
  return [
    values,
    (req, res, next) => {
      const errors = validationResult(req);

      console.log(errors);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((item) => item.msg);

        if (errorMessages[0].startsWith("access")) {
          throw new UnauthorizedError(errorMessages);
        }

        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

export const validateJobInput = validationErrors([
  body("company").notEmpty().withMessage("Please provide company name"),
  body("position").notEmpty().withMessage("Please provide position"),
  body("jobLocation").notEmpty().withMessage("Please provide job location"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
]);

export const validateJobId = validationErrors([
  param("id").custom(async (value, { req }) => {
    const validId = mongoose.Types.ObjectId.isValid(value);

    if (!validId) {
      throw new Error("Invalid ID");
    }

    const job = await Job.findOne({ _id: value });

    const adminUser = req.user.role === "admin";
    const validOwner = job.createdBy.toString() === req.user.userId;

    if (!adminUser && !validOwner) {
      throw new Error("access denied");
    }

    if (!job) {
      throw new NotFoundError(`no job existed with Id: ${value}`);
    }
  }),
]);

export const validateRegisterInput = validationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = validationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Incorrect email format"),
  body("password").notEmpty().withMessage("please provide a password"),
]);

export const validateUserUpdateInput = validationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
]);
