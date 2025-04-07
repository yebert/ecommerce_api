import ErrorResponse from "../utils/ErrorResponse.js";

const validateProduct = (product) => {
  return (req, res, next) => {
    const values = product.validate(req.body, { abortEarly: false });
    if (values.error) {
      const errResponse = new ErrorResponse(values.error, 400);
      return next(errResponse);
    }

    next();
  };
};

export default validateProduct;
