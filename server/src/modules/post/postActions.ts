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

const read: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);

    const post = await postRepository.read(postId);

    res.json(post);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { content, category, userId } = req.body.newPost;

    const insertId = await postRepository.create(content, category, userId);

    res.status(201).json({ insertId, message: "Publication ajoutée" });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);

    await postRepository.delete(postId);

    res.status(200).json({ message: "Publication supprimée" });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updatedPost = {
      postId: Number.parseInt(req.params.id),
      content: req.body.content,
      categoryId: Number.parseInt(req.body.categoryId),
    };

    await postRepository.update(updatedPost);

    res.status(201).json({ message: "Publication modifiée" });
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add, edit, destroy };
