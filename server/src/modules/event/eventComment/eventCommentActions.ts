import type { RequestHandler } from "express";
import eventCommentsRepository from "./eventCommentsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const comment = await eventCommentsRepository.readAll(id);

    res.json(comment);
  } catch (err) {
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newEventComment = {
      content: req.body.content,
      eventId: Number.parseInt(req.params.id),
      userId: Number.parseInt(req.body.userId),
    };

    await eventCommentsRepository.create(newEventComment);

    res.status(201).json({ message: "Commentaire envoyé" });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const comment = {
      id: Number.parseInt(req.params.id),
      content: req.body.content,
    };

    await eventCommentsRepository.update(comment);

    res.status(200).json({ message: "Commentaire modifié" });
  } catch (error) {
    next(error);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number.parseInt(req.params.id);

    await eventCommentsRepository.delete(eventId);

    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    next(error);
  }
};

export default { browse, add, edit, destroy };
