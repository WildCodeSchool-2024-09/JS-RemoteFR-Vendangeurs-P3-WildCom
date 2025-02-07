import axios from "axios";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export const LoginForm = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        }
        if (error.response && error.response.status === 500) {
          toast.error(error.response.data.message);
        }
        if (error.response && error.response.status === 400) {
          toast.warn(error.response.data.error[0]);
        }
      }
    }
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
          id="email"
          autoComplete="email"
          placeholder="Email"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
          value={login.email}
          onChange={handleInputsChange}
        />

        <div className="relative self-center w-2/3 lg:w-1/2">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            autoComplete="current-password"
            id="password"
            placeholder="Mot de passe"
            className="w-full px-3 py-2 rounded-lg"
            value={login.password}
            onChange={handleInputsChange}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute p-2 right-1 top-1 focus:outline-none text-text-secondary"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

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
