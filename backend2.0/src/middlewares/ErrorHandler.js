function errorHandler(err, req, res, next) {
  // If it's a custom API Error
  if (err?.statusCode && err?.message) {
    return res
      .status(err.statusCode)
      .json({ message: err.message });
  }
  
  // Otherwise it's an unknown or server-side error
  console.error(err);
  res
    .status(500)
    .json({ message: "Server Error. Please Try Again Later!" });
}

export { errorHandler };
