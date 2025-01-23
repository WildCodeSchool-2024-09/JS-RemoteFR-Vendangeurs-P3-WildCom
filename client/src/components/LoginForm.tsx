import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const LoginForm = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      login,
      { withCredentials: true },
    );

    const currentUser = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/find/${result.data.userId}`,
      { withCredentials: true },
    );
    setUser(currentUser.data);

    setLogin({
      email: "",
      password: "",
    });

    navigate("/user/home");
  };

  return (
    <article className="flex items-center justify-center h-2/3 lg:h-full lg:w-1/2 text-text-primary font-text">
      <form
        className="flex flex-col w-full gap-5 text-sm text-text-secondary"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
          value={login.email}
          onChange={handleInputsChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2 "
          value={login.password}
          onChange={handleInputsChange}
          required
        />

        <button
          type="submit"
          className="self-center w-1/3 px-6 py-2 mt-6 font-semibold rounded-lg bg-accent-primary text-text-secondary"
        >
          Connexion
        </button>
      </form>
    </article>
  );
};
