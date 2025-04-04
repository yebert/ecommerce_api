import ErrorResponse from "../utils/ErrorResponse.js";

const validateUser = (user) => (req, res, next) => {
  console.log("validateUser Middleware läuft...");
  const values = user.validate(req.body, { abortEarly: false });

  if (values.error) {
    console.log("Validierungsfehler gefunden:", values.error);
    return next(new ErrorResponse(values.error, 400));
  }

  next();
};

export default validateUser;
