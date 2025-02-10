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

  let postId: number | null = null;
  let eventId: number | null = null;

  if (req.body.type === "post") {
    postId = Number.parseInt(req.params.id ?? null);
    eventId = null;
  } else if (req.body.type === "event") {
    eventId = Number.parseInt(req.params.id ?? null);
    postId = null;
  }

  await uploadRepository.createPicture(
    filename,
    path,
    userId,
    postId ?? null,
    eventId ?? null,
  );

  res
    .status(200)
    .json({ message: "Photo mise à jour avec succès", profilePicPath: path });
};

export default { uploadAvatar, uploadPicture };
