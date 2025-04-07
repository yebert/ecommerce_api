import ErrorResponse from "../utils/ErrorResponse.js";

const validateOrder = (order) => {
  return (req, res, next) => {
    const values = order.validate(req.body, { abortEarly: false });
    if (values.error) {
      const errResponse = new ErrorResponse(values.error, 400);
      return next(errResponse);
    }
    next();
  };
};

export default validateOrder;
