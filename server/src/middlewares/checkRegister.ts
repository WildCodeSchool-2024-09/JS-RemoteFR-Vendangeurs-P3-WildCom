import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const checkRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required().messages({
      "string.empty": "Le prénom est obligatoire",
      "string.min": "Le prénom doit contenir au moins 2 caractères",
    }),
    lastName: Joi.string().min(2).required().messages({
      "string.empty": "Le nom est obligatoire",
      "string.min": "Le nom doit contenir au moins 2 caractères",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, allowUnicode: false })
      .required()
      .messages({
        "string.email": "Veuillez entrer un email valide",
        "string.empty": "L'email est obligatoire",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Le mot de passe doit contenir au moins 8 caractères",
      "string.empty": "Le mot de passe est obligatoire",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }
  next();
};

export { checkRegister };
