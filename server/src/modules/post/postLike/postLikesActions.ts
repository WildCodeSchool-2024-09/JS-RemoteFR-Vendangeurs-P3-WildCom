import type { RequestHandler } from "express";
import postLikesRepository from "./postLikesRepository";

const readLikesByUserId: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.body.data.userId);

    const userLikes = await postLikesRepository.readLikesByUserId(userId);
    res.json(userLikes);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPostLike = {
      userId: Number.parseInt(req.body.data.userId),
      postId: Number.parseInt(req.params.id),
    };

    const addLikes = await postLikesRepository.create(newPostLike);

    res.json(addLikes);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const deletedPostLike = {
      userId: Number.parseInt(req.body.userId),
      postId: Number.parseInt(req.params.id),
    };

    const deletedLike = await postLikesRepository.delete(deletedPostLike);

    res.json(deletedLike);
  } catch (err) {
    next(err);
  }
};

export default { readLikesByUserId, add, destroy };
