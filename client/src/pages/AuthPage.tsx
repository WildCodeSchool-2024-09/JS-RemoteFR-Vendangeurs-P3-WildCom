import { useState } from "react";
import { BackgroundEffects } from "../components/Layout/BackgroundEffects";
import { LoginForm } from "../components/LoginForm";
import { Logo } from "../components/Logo";
import { RegisterForm } from "../components/RegisterForm";

import "../App.css";

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-text-secondary">
      <BackgroundEffects />

      <section
        className={`z-10 flex w-96 lg:w-[950px]  lg:border-2 rounded-lg lg:border-bg_opacity-secondary h-full lg:h-2/3 lg:bg-bg_opacity-primary ${isRegister ? "flex-col-reverse lg:flex-row-reverse" : "flex-col-reverse lg:flex-row"}`}
      >
        {isRegister ? <RegisterForm /> : <LoginForm />}

        <aside className="z-20 flex flex-col items-center justify-center w-full lg:justify-start lg:w-1/2 h-1/2 lg:h-full lg:bg-bg_opacity-secondary ">
          <header className="flex lg:items-start h-1/2 lg:h-20 lg:my-10">
            <Logo isLayout={false} />
          </header>

          <main className="flex flex-col items-center justify-between gap-6 mt-8 lg:mt-16 h-1/4 text-text-primary">
            <h2 className="text-2xl">
              {isRegister ? "Inscription" : "Connexion"}
            </h2>

            <p>
              {isRegister ? "Déjà un compte ? " : "Pas encore de compte ? "}

              <button
                type="button"
                className="text-accent-primary hover:underline"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Se connecter " : "S'inscrire"}
              </button>
            </p>
          </main>
        </aside>
      </section>
    </div>
  );
};
