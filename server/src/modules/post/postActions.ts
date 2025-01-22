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

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPost = {
      content: req.body.content,
      picture: req.body.picture,
      category: req.body.category,
      user_id: req.body.user_id,
    };

    const insertId = await postRepository.create(newPost);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
