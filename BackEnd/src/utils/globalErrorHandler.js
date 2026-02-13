import { ApiError } from "./ApiError.js";

const globalErrorHandler = (err, req, res, next) => {
    let error = err;

    // Check if the error is an instance of ApiError, if not, convert it
    // Check if the error is an instance of ApiError, if not, convert it
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof Error ? 500 : 400;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], error.stack);

    }

    if(error.message === "invalid token") {
        error.message = "Unauthorized";
        error.statusCode = 401;
    }

    

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };



    return res.status(error.statusCode).json(response);
};

export { globalErrorHandler };
