import type { Request, RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const verifyUser: RequestHandler = (req: CustomRequest, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Veuillez vous authentifier" });
    return;
  }

  if (!process.env.APP_SECRET) {
    throw new Error("APP_SECRET is not defined");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.APP_SECRET,
    ) as JwtPayload;

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export { verifyUser };
