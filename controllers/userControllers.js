import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { unlink } from "fs/promises";
import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  console.log(req.file);

  let obj = { ...req.body };
  delete obj.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await unlink(req.file.path);
    obj.avatar = response.secure_url;
    obj.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};

export const getAppStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};
