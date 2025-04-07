import Joi from "joi";

const ProductSchema = Joi.object({
  // id: Joi.number().required(),
  name: Joi.string().min(1).max(100).required(),
  price: Joi.number().required(),
  description: Joi.string().min(1).max(10000).required(),
  categoryId: [Joi.number().required()],
});

export default ProductSchema;
