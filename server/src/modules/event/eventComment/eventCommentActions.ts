import type { RequestHandler } from "express";
import EventCommentRepository from "./eventCommentRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const comment = await EventCommentRepository.readAll();
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

export default { browse };
