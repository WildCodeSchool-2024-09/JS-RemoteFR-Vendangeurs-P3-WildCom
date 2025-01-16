import type { RequestHandler } from "express";
import profilRepository from "./profilRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);
    const profile = await profilRepository.read(parsedId);

    if (profile == null) {
      res.sendStatus(404);
    } else {
      res.json(profile);
    }
  } catch (err) {
    next(err);
  }
};
export default { read };
