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
    avatar: Joi.string().allow("").optional(),
    github: Joi.string()
      .trim()
      .uri()
      .optional()
      .allow("")
      .messages({ "string.uri": "Le champ GitHub doit être une URL valide" }),
    linkedin: Joi.string()
      .trim()
      .uri()
      .optional()
      .allow("")
      .messages({ "string.uri": "Le champ LinkedIn doit être une URL valide" }),
    biography: Joi.string().trim().optional().allow(""),
    site: Joi.string()
      .trim()
      .uri()
      .optional()
      .allow("")
      .messages({ "string.uri": "Le champ Site web doit être une URL valide" }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }
  next();
};

export { checkUserDatas };
