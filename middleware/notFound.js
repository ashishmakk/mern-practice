import { StatusCodes } from "http-status-codes";

const notFound = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send("This route does not exist. Please check the URL again.");
};

export default notFound;