import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const createSchema = Joi.object({
    title: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le titre est obligatoire",
      "any.required": "Le titre est obligatoire",
    }),
    place: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le lieu est obligatoire",
      "any.required": "Le lieu est obligatoire",
    }),
    calendar: Joi.date().greater("now").required().messages({
      "date.base": "La date est obligatoire",
      "any.required": "La date est obligatoire",
      "date.greater": "La date ne peut pas être antérieure à la date actuelle",
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
      "number.base": "L'id doit être un nombre",
      "any.required": "La catégorie est obligatoire",
    }),
    userId: Joi.number().required(),
    pictureId: Joi.number().allow(null),
  });

  const updateSchema = Joi.object({
    title: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le titre est obligatoire",
      "any.required": "Le titre est obligatoire",
    }),
    place: Joi.string().trim().min(1).required().messages({
      "string.empty": "Le lieu est obligatoire",
      "any.required": "Le lieu est obligatoire",
    }),
    calendar: Joi.date().greater("now").required().messages({
      "date.base": "La date est obligatoire",
      "any.required": "La date est obligatoire",
      "date.greater": "La date ne peut pas être antérieure à la date actuelle",
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
    pictureId: Joi.number().allow(null),
    created_at: Joi.optional(),
    user: Joi.optional(),
  });

  const schema = req.method === "POST" ? createSchema : updateSchema;

  const dataToValidate =
    req.method === "POST"
      ? req.body.newEvent
      : { ...req.body, id: req.params.id };

  const { error } = schema.validate(dataToValidate, { abortEarly: false });

  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
    return;
  }

  next();
};

export { validateEvent };
