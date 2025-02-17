import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const createSchema = Joi.object({
    content: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le contenu est obligatoire",
      "any.required": "Le contenu est obligatoire",
    }),
    category: Joi.number().required().messages({
      "number.base": "La catégorie est obligatoire",
      "any.required": "La catégorie est obligatoire",
    }),
    userId: Joi.number().required(),
    pictureId: Joi.number().allow(null),
  });

  const updateSchema = Joi.object({
    content: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le contenu est obligatoire",
      "any.required": "Le contenu est obligatoire",
    }),
    categoryId: Joi.number().messages({
      "number.base": "La catégorie est obligatoire",
      "any.required": "La catégorie est obligatoire",
    }),
    id: Joi.number().allow(null),
    categoryName: Joi.optional(),
    picture: Joi.optional(),
    pictureId: Joi.number().allow(null),
    user: Joi.optional(),
  });

  const schema = req.method === "POST" ? createSchema : updateSchema;
  const dataToValidate =
    req.method === "POST"
      ? req.body.newPost
      : { ...req.body, id: req.params.id };
  const { error } = schema.validate(dataToValidate, { abortEarly: false });

  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }
  next();
};

export { validatePost };
