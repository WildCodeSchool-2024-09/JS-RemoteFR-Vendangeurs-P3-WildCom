import axios from "axios";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

type RegisterFormProps = {
  setIsRegister: (value: boolean) => void;
};

export const RegisterForm = ({ setIsRegister }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputsChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        register,
      );

      if (response.status === 201) {
        toast.success(response.data.message);
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setIsRegister(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response && error.response.status === 400) {
          toast.warn(error.response.data.error[0]);
        }
      }
    }
  };

  return (
    <article className="flex items-center justify-center h-2/3 lg:h-full lg:w-1/2 text-text-primary font-text">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full gap-5 text-sm text-text-secondary"
      >
        <input
          type="text"
          name="firstName"
          id="firstName"
          autoComplete="given-name"
          value={register.firstName}
          onChange={handleInputsChange}
          placeholder="Prénom"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
        />

        <input
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="family-name"
          onChange={handleInputsChange}
          value={register.lastName}
          placeholder="Nom"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
        />

        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          onChange={handleInputsChange}
          value={register.email}
          placeholder="Email"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
        />

        <div className="relative self-center w-2/3 lg:w-1/2">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            id="password"
            autoComplete="new-password"
            value={register.password}
            onChange={handleInputsChange}
            placeholder="Mot de passe"
            className="w-full px-3 py-2 rounded-lg "
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
          Inscription
        </button>
      </form>
    </article>
  );
};
