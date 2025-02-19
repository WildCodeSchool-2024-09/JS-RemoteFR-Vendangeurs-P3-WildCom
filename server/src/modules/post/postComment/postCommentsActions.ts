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

    res.status(201).json({ message: "Commentaire envoyé" });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const post = {
      id: Number.parseInt(req.params.id),
      content: req.body.content,
    };

    await postCommentsRepository.update(post);

    res.status(200).json({ message: "Commentaire modifié" });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number.parseInt(req.params.id);

    await postCommentsRepository.delete(postId);

    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    next(error);
  }
};

export default { browse, add, edit, destroy };
