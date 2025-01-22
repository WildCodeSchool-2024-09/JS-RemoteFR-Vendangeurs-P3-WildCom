import argon2 from "argon2";
import type { RequestHandler } from "express";

import { generateToken, passwordsMatch } from "../../helpers/authTools";
import authRepository from "./authRepository";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.readOneByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await passwordsMatch(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ user });

    res.status(200).json({ message: "Connection successfuly", user });
  } catch (error) {
    console.error("Unexpected error: ", error);
    res.status(500).json({ message: "An unexpected error occurred" });
    return;
  }
};

export default { login };
