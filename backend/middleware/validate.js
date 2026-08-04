import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      throw new ApiError(
        400,
        error.details.map((item) => item.message).join(", ")
      );
    }

    req.body = value;

    next();
  };
};

export default validate;