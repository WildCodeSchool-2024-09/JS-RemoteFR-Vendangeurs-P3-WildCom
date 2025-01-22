import type { RequestHandler } from "express";

import { generateToken, passwordsMatch } from "../../helpers/authTools";
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

  res.status(200).json(user);
};

export default { login, findCurrentUser };
