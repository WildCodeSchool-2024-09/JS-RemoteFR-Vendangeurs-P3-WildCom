import type { Request, RequestHandler } from "express";
import uploadRepository from "./uploadRepository";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
  post?: {
    postId: number;
  };
  event?: {
    eventId: number;
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

const uploadPicture: RequestHandler = async (
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
  const { userId } = req.user;
  const postId = req.params.id ?? null;
  const eventId = req.params.id ?? null;

  await uploadRepository.createPicture(
    filename,
    path,
    userId,
    Number(postId),
    Number(eventId),
  );

  res
    .status(200)
    .json({ message: "Photo mise à jour avec succès", profilePicPath: path });
};

export default { uploadAvatar, uploadPicture };
