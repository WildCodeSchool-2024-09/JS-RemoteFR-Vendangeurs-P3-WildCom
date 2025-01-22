import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const checkAuthDatas = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });

  if (!req.body) {
    res.status(400).json({ error: "Request body is missing" });
    return;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

export { checkAuthDatas };
