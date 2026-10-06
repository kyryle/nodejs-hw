import {HttpError} from "http-errors";
const isInProduction = process.env.NODE_ENV === "production";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: isInProduction ? "An error has occurred" : error.message });
};
