import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(4)
    // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    // .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/)
    // .regex(/[0-9a-zA-Z]*\[a-zA-Z][0-9a-zA-Z]*/)
    .required(),
});

export { UserSchema };
