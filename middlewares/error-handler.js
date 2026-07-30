// middlewares/error-handler.js

module.exports = (err, req, res, next) => {
  console.error(err); // always log errors

  // destructure with default
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};
