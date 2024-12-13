import "dotenv/config";
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import Job from "./models/JobModel.js";
import { readFile } from "fs/promises";
import { URL } from "url";
import User from "./models/UserModel.js";

const app = express();

try {
  await mongoose.connect(process.env.MONGO_URL);

  const user = await User.findOne({ email: "roger@gmail.com" });
  
  const jobData = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );

  const finalData = jobData.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({ createdBy: user._id });
  await Job.insertMany(finalData);
  console.log("success");
  process.exit(0)
} catch (error) {
  console.log(error);
  process.exit(1);
}
