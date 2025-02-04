import path from "node:path";
import type { NextFunction, Request, Response } from "express";
import multer, { type StorageEngine } from "multer";

const DBPath = "assets/uploads/avatars";
const serverPath: string = path.join(__dirname, "../../public", DBPath);

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, serverPath);
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

const upload = multer({ storage, fileFilter }).single("avatar");

const adjustFilePath = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  }

  req.file.path = `${DBPath}/${req.file.filename}`;
  next();
};

export { adjustFilePath, upload };
