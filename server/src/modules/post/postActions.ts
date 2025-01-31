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
    const { content, category, userId } = req.body.newPost;
    const insertId = await postRepository.create(content, category, userId);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);

    await postRepository.delete(postId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const { content, category } = req.body.postData;

    if (!content || !category) {
      res
        .status(400)
        .json({ message: "Le contenu ou la catégorie ne peuvent être vide" });
      return;
    }

    await postRepository.update(postId, content, category);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, add, destroy, edit };
