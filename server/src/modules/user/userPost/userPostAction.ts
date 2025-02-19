import type { RequestHandler } from "express";
import userPostRepository from "./userPostRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);
    const user = await userPostRepository.readAll(parsedId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};
export default { browse };
