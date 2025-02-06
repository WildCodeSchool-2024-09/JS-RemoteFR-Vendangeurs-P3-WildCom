import { Link } from "react-router-dom";
import { BackgroundEffects } from "../components/Layout/BackgroundEffects";
import { Logo } from "../components/Logo";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen text-center gap-9 bg-bg-primary">
      <Logo isLayout={false} />

      <img
        className=" rounded-full size-52 drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGJvZ2RzdzJ6cDlzMWl3emx5ZzI1d3AzNjcxaTkxcGxtbDcwcnNrbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/20k1punZ5bpmM/giphy.gif"
        alt="gif 404"
      />
      <h1 className="font-title font-bold text-8xl text-accent-primary  drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] ">
        404
      </h1>
      <p className="font-text w-full mt-4 text-6xl text-gray-600 text-accent-primary drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]">
        Oups ! Page introuvable...
      </p>
      <button type="button" className="">
        <Link
          to="/"
          className="font-text flex py-2 mt-10 text-4xl text-accent-primary animate-bounce drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
        >
          Retour à l'accueil
        </Link>
      </button>
      <BackgroundEffects />
    </div>
  );
};

export default NotFound;
