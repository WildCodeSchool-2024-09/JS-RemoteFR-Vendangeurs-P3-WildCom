import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateComment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const createSchema = Joi.object({
    content: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le contenu est obligatoire",
      "any.required": "Le contenu est obligatoire",
    }),
    userId: Joi.number().required(),
  });

  const updateSchema = Joi.object({
    content: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le contenu est obligatoire",
      "any.required": "Le contenu est obligatoire",
    }),
    id: Joi.number().allow(null),
  });

  const schema = req.method === "POST" ? createSchema : updateSchema;

  const dataToValidate =
    req.method === "POST"
      ? req.body
      : { content: req.body.content, id: req.params.id };

  const { error } = schema.validate(dataToValidate, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }
  next();
};

export { validateComment };
