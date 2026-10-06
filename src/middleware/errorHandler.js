import {isHttpError} from "http-errors";
const isInProduction = process.env.NODE_ENV === "production";

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({ error: error.message });
  }
  res.status(500).json({ message: isInProduction ? error.message : error.message });
};
