import { ErrorResponse } from "../error/errorResponse.js";

export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ErrorResponse) {
    res
      .status(err.code)
      .json({
        code: err.code,
        errors: err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        code: 500,
        errors: err.message,
      })
      .end();
  }
};
