import type { RequestHandler } from "express";
import eventCommentsRepository from "./eventCommentsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const comment = await eventCommentsRepository.readAll(id);

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

export default { browse };
