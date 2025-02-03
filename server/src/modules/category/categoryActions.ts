import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const readByTypePost: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.readByTypePost();

    if (!categories) {
      res
        .status(404)
        .json({ message: "Aucune catégorie de publication trouvée" });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const readByTypeEvent: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.readByTypeEvent();

    if (!categories) {
      res.status(404).json({ message: "Aucune catégorie d'événement trouvée" });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export default { readByTypePost, readByTypeEvent };
