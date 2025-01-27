import type { RequestHandler } from "express";
import postLikesRepository from "./postLikesRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPostLike = {
      userId: Number.parseInt(req.body.userId),
      postId: Number.parseInt(req.params.id),
    };

    const addLikes = await postLikesRepository.create(newPostLike);

    res.json(addLikes);
  } catch (err) {
    next(err);
  }
};

export default { add };
