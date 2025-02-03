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

    res.status(201).json({ message: "Commentaire envoyé !" });
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

    const affectedRows = await eventCommentsRepository.update(comment);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number.parseInt(req.params.id);
    const affectedRows = await eventCommentsRepository.delete(eventId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, add, edit, destroy };
