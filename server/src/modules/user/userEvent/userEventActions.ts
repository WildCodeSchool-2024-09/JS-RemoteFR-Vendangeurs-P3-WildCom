import type { RequestHandler } from "express";
import userPostRepository from "./userEventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);
    const response = await userPostRepository.readAll(parsedId);

    if (response == null) {
      res.status(404);
      return;
    }

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export default { browse };
