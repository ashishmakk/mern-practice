import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";

export const getAllJobs = async (req, res) => {
  const { search } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  const allJobs = await Job.find(queryObj);

  res.status(StatusCodes.OK).json({ totalJobs: allJobs.length, allJobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg: "Job updated", updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const deletedJob = await Job.findByIdAndDelete(id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Job deleted successfully", deletedJob });
};

export const getStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: status, count } = curr;

    acc[status] = count;

    return acc;
  }, {});

  console.log(stats);

  const defaultStats = {
    interview: stats.interview || 0,
    pending: stats.pending || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { count, date };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
