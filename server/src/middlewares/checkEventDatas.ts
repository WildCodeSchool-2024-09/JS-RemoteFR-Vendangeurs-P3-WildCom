import { id_ID } from "@faker-js/faker/.";
import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le titre est obligatoire",
      "any.required": "Le titre est obligatoire",
    }),
    place: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le lieu est obligatoire",
      "any.required": "Le lieu est obligatoire",
    }),
    calendar: Joi.date().required().messages({
      "date.base": "La date est obligatoire",
      "any.required": "La date est obligatoire",
    }),
    time: Joi.string().trim().required().messages({
      "string.empty": "L'heure est obligatoire",
      "any.required": "L'heure est obligatoire",
    }),
    content: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le contenu est obligatoire",
      "any.required": "Le contenu est obligatoire",
    }),
    categoryId: Joi.number().required().messages({
      "number.base": "La catégorie est obligatoire",
      "any.required": "La catégorie est obligatoire",
    }),
    id: Joi.optional(),
    categoryName: Joi.optional(),
    picture: Joi.optional(),
    created_at: Joi.optional(),
    user: Joi.optional(),
  });

  const dataToValidate = req.method === "POST" ? req.body.newEvent : req.body;

  const { error } = schema.validate(dataToValidate, { abortEarly: false });

  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }

  next();
};

export { validateEvent };
