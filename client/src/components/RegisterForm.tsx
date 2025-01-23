export const RegisterForm = () => {
  return (
    <article className="flex items-center justify-center h-2/3 lg:h-full lg:w-1/2 text-text-primary font-text">
      <form className="flex flex-col w-full gap-5 text-sm text-text-secondary ">
        <input
          type="text"
          placeholder="Prénom"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
        />

        <input
          type="text"
          placeholder="Nom"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
        />

        <input
          type="email"
          placeholder="Email"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="self-center w-2/3 px-3 py-2 rounded-lg lg:w-1/2 "
        />

        <button
          type="button"
          className="self-center w-1/3 px-6 py-2 mt-6 font-semibold rounded-lg bg-accent-primary text-text-secondary"
        >
          Inscription
        </button>
      </form>
    </article>
  );
};
