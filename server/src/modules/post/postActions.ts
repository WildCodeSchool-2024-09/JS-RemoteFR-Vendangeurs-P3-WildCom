import type { RequestHandler } from "express";
import postRepository from "./postRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const posts = await postRepository.readAll();

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export default { browse };
