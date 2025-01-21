import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

export const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user/home");
  };
  return (
    <>
      <header className="flex justify-end w-full p-10 mb-60 h-2/5">
        <Logo />
      </header>

      <main className="flex flex-col items-center justify-center gap-6 mx-auto h-3/5">
        <h1 className="text-2xl font-bold uppercase">Page de connexion</h1>
        <button
          type="button"
          className="px-6 py-3 font-semibold text-white rounded-lg bg-accent-primary"
          onClick={handleClick}
        >
          Login
        </button>
      </main>
    </>
  );
};
