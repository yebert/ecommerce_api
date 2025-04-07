import ErrorResponse from "../utils/ErrorResponse.js";

const validateCategory = (category) => (req, res, next) => {
  const values = category.validate(req.body, { abortEarly: false });

  if (values.error) {
    return next(new ErrorResponse(values.error, 400));
  }

  next();
};

export default validateCategory;
