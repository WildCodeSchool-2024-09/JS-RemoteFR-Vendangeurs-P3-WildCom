import argon2 from "argon2";

const passwordsMatch = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

export { passwordsMatch };
