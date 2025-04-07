import Joi from "joi";

const OrderSchema = Joi.object({
  userId: Joi.number().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

export default OrderSchema;
