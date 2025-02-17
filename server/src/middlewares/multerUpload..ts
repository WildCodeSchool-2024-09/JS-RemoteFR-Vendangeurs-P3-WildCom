import fs from "node:fs";
import path from "node:path";
import type { NextFunction, Request, Response } from "express";
import multer, { type StorageEngine } from "multer";

const AvatarPath = "assets/uploads/avatars";
const serverAvatarPath: string = path.join(
  __dirname,
  "../../public",
  AvatarPath,
);

const PicturePath = "assets/uploads/pictures";
const serverPicturePath: string = path.join(
  __dirname,
  "../../public",
  PicturePath,
);

const storageImage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, serverAvatarPath);
    } else if (file.fieldname === "picture") {
      cb(null, serverPicturePath);
    } else {
      cb(null, "../../public");
    }
  },
  filename: (req: Request, file, cb) => {
    const date = Date.now();
    const extension = path.extname(file.originalname);
    const randomNumber = Math.floor(Math.random() * 1000);
    const newUniqueFilename = `D${date}-R${randomNumber}${extension}`;

    cb(null, newUniqueFilename);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile?: boolean) => void,
) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const extension = path.extname(file.originalname).toLowerCase();

  if (!file.mimetype.startsWith("image")) {
    return cb(new Error("Votre fichier doit être une image"));
  }

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Votre fichier doit être au format jpg, jpeg, png ou webp"));
  }
};

const uploadImage = multer({ storage: storageImage, fileFilter });

const adjustAvatarPath = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  }

  req.file.path = `${AvatarPath}/${req.file.filename}`;
  next();
};

const adjustPicturePath = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  }
  req.file.path = `${PicturePath}/${req.file.filename}`;
  next();
};

const deleteImage = (req: Request, res: Response, next: NextFunction) => {
  const filePath = req.body.path;
  const completeFilePath = path.join(__dirname, "../../public", filePath);
  fs.unlink(completeFilePath, (err) => {
    if (err) {
      console.error(
        `Erreur lors de la suppression du fichier : ${filePath}`,
        err,
      );
    } else {
      console.info(`Fichier supprimé : ${filePath}`);
      next();
    }
  });
};

export { adjustAvatarPath, adjustPicturePath, deleteImage, uploadImage };
