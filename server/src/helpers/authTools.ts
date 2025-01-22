import argon2 from "argon2";
import jwt from "jsonwebtoken";

type User = {
  id: number;
  role: boolean;
};

const passwordsMatch = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

const generateToken = ({ user }: { user: User }) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.APP_SECRET as string,
    {
      expiresIn: "1h",
    },
  );
};

export { passwordsMatch, generateToken };
