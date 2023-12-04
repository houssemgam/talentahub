const notFoundError = (req, res, next) => {
    const err = new Error("Page not found!");
    err.status = 404;
    next(err);
  };
  
  const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
  };
  
  module.exports = { notFoundError, errorHandler };
  