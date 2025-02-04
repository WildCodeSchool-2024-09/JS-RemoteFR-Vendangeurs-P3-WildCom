import type { Request, RequestHandler } from "express";
import uploadRepository from "./uploadRepository";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

const upload: RequestHandler = async (req: AuthenticatedRequest, res) => {
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

export default { upload };
