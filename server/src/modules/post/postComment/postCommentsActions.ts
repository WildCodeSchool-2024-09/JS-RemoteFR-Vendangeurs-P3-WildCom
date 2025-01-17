import type { RequestHandler } from "express";
import postCommentsRepository from "./postCommentsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const comments = await postCommentsRepository.readAll(id);

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export default { browse };
