import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const checkUserDatas = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    firstname: Joi.string().trim().min(2).required().messages({
      "string.empty": "Le prénom est obligatoire",
      "string.min": "Le prénom doit contenir au moins 2 caractères",
    }),
    lastname: Joi.string().trim().min(2).required().messages({
      "string.empty": "Le nom est obligatoire",
      "string.min": "Le nom doit contenir au moins 2 caractères",
    }),
    avatarPath: Joi.allow("null").optional(),
    avatarId: Joi.number().allow(null),
    github: Joi.optional().allow("null"),
    linkedin: Joi.optional().allow("null"),
    biography: Joi.optional().allow("null"),
    site: Joi.optional().allow("null"),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }
  next();
};

export { checkUserDatas };
