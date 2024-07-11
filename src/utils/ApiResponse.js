class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

const apiResponseWithStatusCode = (
  res,
  statusCode = 404,
  message = "Something not good!",
  data = {}
) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
};

export { ApiResponse, apiResponseWithStatusCode };
