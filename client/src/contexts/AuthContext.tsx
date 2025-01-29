import { createContext, useContext, useMemo, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: number;
  username: string;
  avatar: string;
  role: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
