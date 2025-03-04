import type { RequestHandler } from "express";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readAll();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const event = {
      id: Number.parseInt(req.params.id),
      content: req.body.content,
      categoryId: req.body.categoryId,
      picture: req.body.picture,
      pictureId: Number.parseInt(req.body.pictureId),
      title: req.body.title,
      place: req.body.place,
      calendar: req.body.calendar,
      time: req.body.time,
    };

    await eventRepository.update(event);

    res.status(201).json({ message: "Événement modifié" });
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.read(eventId);

    res.json(event);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newEvent = {
      content: req.body.newEvent.content,
      categoryId: Number.parseInt(req.body.newEvent.categoryId),
      pictureId: req.body.newEvent.pictureId,
      title: req.body.newEvent.title,
      place: req.body.newEvent.place,
      calendar: req.body.newEvent.calendar,
      time: req.body.newEvent.time,
      userId: req.body.newEvent.userId,
    };

    const insertId = await eventRepository.create(newEvent);

    res.status(201).json({ insertId, message: "Événement ajouté" });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    await eventRepository.delete(eventId);

    res.status(200).json({ message: "Événement supprimé" });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
