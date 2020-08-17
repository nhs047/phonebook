module.exports = {
  successResponse: (res, isExecuted, data, message) =>
    successResponse(res, isExecuted, data, message),
  errorResponse: (context, code, data, message) =>
    errorResponse(context, code, data, message),
  bangladeshiNumberRegExp: "^:?(88|\\+88)?(01)([3-9])(\\d{8})"
};

const errorResponse = (res, code, data, message) => {
  return res.status(code).json(bodyContent(false, data, message));
};

const successResponse = (res, isExecuted, data, message) => {
  return res.status(200).json(bodyContent(isExecuted, data, message));
};

const bodyContent = (isExecuted, data, message) => {
  return {
    isExecuted,
    data,
    message
  };
}
    