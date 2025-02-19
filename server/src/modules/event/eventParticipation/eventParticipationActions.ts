import type { RequestHandler } from "express";
import eventParticipationsRepository from "./eventParticipationsRepository";

const readParticipationsByUserId: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.body.data.userId);

    const userParticipations =
      await eventParticipationsRepository.readLikesByUserId(userId);
    res.json(userParticipations);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newEventParticipation = {
      userId: Number.parseInt(req.body.data.userId),
      eventId: Number.parseInt(req.params.id),
    };

    const addParticipation = await eventParticipationsRepository.create(
      newEventParticipation,
    );

    res.json(addParticipation);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const deletedEventParticipation = {
      userId: Number.parseInt(req.body.userId),
      eventId: Number.parseInt(req.params.id),
    };

    const deletedParticipation = await eventParticipationsRepository.delete(
      deletedEventParticipation,
    );

    res.json(deletedParticipation);
  } catch (err) {
    next(err);
  }
};

export default { readParticipationsByUserId, add, destroy };
