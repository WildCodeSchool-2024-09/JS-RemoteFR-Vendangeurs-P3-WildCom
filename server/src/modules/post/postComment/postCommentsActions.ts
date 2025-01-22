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
const add: RequestHandler = async (req, res, next) => {
  try {
    const newPostComment = {
      content: req.body.content,
      postId: Number.parseInt(req.params.id),
      userId: Number.parseInt(req.body.userId),
    };

    await postCommentsRepository.create(newPostComment);

    res.status(201).json({ message: "Commentaire envoyé !" });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
