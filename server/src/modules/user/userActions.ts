import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.browse();

    if (users) {
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);

    const user = await userRepository.read(parsedId);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const readUserInfos: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);

    const user = await userRepository.readUserInfo(parsedId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = {
      id: Number.parseInt(req.body.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatarId: Number.parseInt(req.body.avatarId) || null,
      github: req.body.github,
      linkedin: req.body.linkedin,
      site: req.body.site,
      biography: req.body.biography,
    };

    const updatedUser = await userRepository.update(id, userData);

    res.status(200).json({ updatedUser, message: "Utilisateur mis à jour" });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);

    await userRepository.destroy(parsedId);

    res.status(200).json({ message: "Utilisateur supprimé" });
    return;
  } catch (err) {
    next(err);
  }
};

export default { browse, read, update, readUserInfos, destroy };
