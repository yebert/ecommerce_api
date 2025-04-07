import Joi from "joi";

const CategorySchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
});

export { CategorySchema };
