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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const response = await categoryRepository.update(Number.parseInt(id), name);

    if (!response) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }

    res.status(200).json({ message: "Catégorie modifiée" });
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, type } = req.body;

    const response = await categoryRepository.create(name, type);

    if (!response) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }

    res.status(200).json({ message: "Catégorie ajoutée" });
  } catch (error) {
    const err = error as { code: string };
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "Cette catégorie existe déjà" });
      return;
    }
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await categoryRepository.delete(Number.parseInt(id));

    if (!response) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }

    res.status(200).json({ message: "Catégorie supprimée" });
  } catch (error) {
    next(error);
  }
};

export default { readByTypePost, readByTypeEvent, edit, add, destroy };
