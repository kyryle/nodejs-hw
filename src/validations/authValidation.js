import { Joi, Segments } from "celebrate";

export const createUserSchema = ({
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
  })
});

export const loginUserSchema = ({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required(),
  })
});
