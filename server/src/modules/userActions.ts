import type { RequestHandler } from "express";
import userRepository from "./user/userRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);
    const user = await userRepository.read(parsedId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};
export default { read };
