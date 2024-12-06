import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

// MIDDLEWARES ===============================

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(notFound);
app.use(errorHandler);

// SERVER CONNECTION ===============================

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Port is listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
