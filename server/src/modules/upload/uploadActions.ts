import type { Request, RequestHandler } from "express";
import uploadRepository from "./uploadRepository";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

const uploadAvatar: RequestHandler = async (req: AuthenticatedRequest, res) => {
  if (!req.file) {
    res.status(400).json({ message: "Échec de l'envoi du fichier" });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: "Veuillez vous authentifier" });
    return;
  }
  const { filename, path } = req.file;
  const { userId } = req.user;

  await uploadRepository.createAvatar(filename, path, userId);

  res
    .status(200)
    .json({ message: "Photo mise à jour avec succès", profilePicPath: path });
};

const uploadPicturePost: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
) => {
  if (!req.file) {
    res.status(400).json({ message: "Échec de l'envoi du fichier" });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: "Veuillez vous authentifier" });
    return;
  }
  const { filename, path } = req.file;

  const response = await uploadRepository.createPicturePost(filename, path);

  res.status(200).json({
    message: "Photo mise à jour avec succès",
    path: path,
    id: response.id,
  });
};

const uploadPictureEvent: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
) => {
  if (!req.file) {
    res.status(400).json({ message: "Échec de l'envoi du fichier" });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: "Veuillez vous authentifier" });
    return;
  }
  const { filename, path } = req.file;

  const response = await uploadRepository.createPicturePost(filename, path);

  res.status(200).json({
    message: "Photo mise à jour avec succès",
    path: path,
    id: response.id,
  });
};

const deletePicture: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
) => {
  const { id } = req.params;
  const pictureId = Number.parseInt(id);

  const response = await uploadRepository.deletePicture(pictureId);
  if (response > 0) {
    res.status(204);
  }
};

export default {
  uploadAvatar,
  uploadPicturePost,
  uploadPictureEvent,
  deletePicture,
};
