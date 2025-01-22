import type { RequestHandler } from "express";

import authRepository from "./authRepository";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.readOneByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (!user.password) {
      throw new Error("Password field is missing in user object");
    }

    if (password !== user.password) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.status(200).json({ message: "Connection successfuly", user });
  } catch (error) {
    console.error("Unexpected error: ", error);
    res.status(500).json({ message: "An unexpected error occurred" });
    return;
  }
};

export default { login };
