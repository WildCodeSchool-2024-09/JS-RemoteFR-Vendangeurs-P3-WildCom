import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const checkAuthDatas = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
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

  if (!req.body) {
    res.status(400).json({ error: "Request body is missing" });
    return;
  }

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }

  next();
};

export { checkAuthDatas };
