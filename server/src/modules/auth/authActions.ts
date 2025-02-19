import argon2 from "argon2";
import type { RequestHandler } from "express";
import { generateToken, passwordsMatch } from "../../helpers/authTools";
import { capitalize } from "../../utils/capitalize";
import authRepository from "./authRepository";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.readOneByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    const isPasswordValid = await passwordsMatch(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    const token = generateToken({ user });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({ message: "Connexion réussie", userId: user.id });
  } catch (error) {
    console.error("Unexpected error: ", error);
    res.status(500).json({ message: "Une erreur inattendue s'est produite" });
    return;
  }
};

const findCurrentUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await authRepository.readById(Number(id));
  if (!user) {
    res.status(404).json({ message: "Utilisateur non trouvé" });
    return;
  }

  res.status(200).json(user);
};

const logout: RequestHandler = async (req, res, next) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Déconnexion réussie" });
};

const register: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // tout les champs sont remplis ???

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: "Tous les champs sont requis." });
      return;
    }

    // Vérification si user existe déjà

    const existingUser = await authRepository.readOneByEmail(email);
    if (existingUser) {
      res.status(401).json({ message: "L'email est déjà utilisé." });
      return;
    }

    const hashPassword = await argon2.hash(password);

    // Création du nouveau user

    const newUser = await authRepository.create(
      capitalize(firstName),
      capitalize(lastName),
      email,
      hashPassword,
    );

    // Réponse

    res
      .status(201)
      .json({ message: "Inscription réussie", userId: newUser.id });
  } catch (error) {
    const err = error as { code: string };
    if (err.code === "ERR_BAD_REQUEST") {
      res.status(401).json({ message: "Email est déjà utilisé." });
    }
  }
};

export default { login, findCurrentUser, logout, register };
