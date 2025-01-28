import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface PostModalProps {
  closeModal: () => void;
}

function PostModal({ closeModal }: PostModalProps) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        onClick={closeModal}
        onKeyUp={(e) => e.key === "Enter" && closeModal()}
        className="fixed inset-0 z-10 bg-bg_opacity-secondary backdrop-blur-sm"
      />
      <div className=" flex flex-col space-y-3 fixed z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-xl bg-bg-primary gap-3 w-full md:w-2/3 lg:w-1/3 h-auto">
        <h2 className="text-text-primary flex justify-center font-title text-xl">
          Créer une publication
        </h2>
        <header className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            <FaRegUserCircle className="text-text-primary size-9" />
            <p className="text-base text-text-primary">Username</p>
          </section>
          <form className="flex gap-3" action="">
            {image !== null && (
              <button
                onClick={() => setImage(null)}
                type="button"
                className="text-text-primary hover:text-accent-primary cursor-pointer text-3xl"
              >
                <RiDeleteBin6Line />
              </button>
            )}
            {image === null && (
              <label
                className="text-text-primary hover:text-accent-primary cursor-pointer text-4xl"
                htmlFor="upload"
              >
                <BiImageAdd />
              </label>
            )}
            <input
              onChange={handleChange}
              className="hidden"
              id="upload"
              type="file"
            />
          </form>
        </header>
        <form className="flex flex-col gap-4" action="">
          {/* {image && <img className="rounded-xl" src={image} alt="" />} */}

          <textarea
            maxLength={65535}
            style={{ resize: "none" }}
            rows={6}
            className="p-4 space-y-2 text-sm rounded-xl text-text-secondary w-full"
            name=""
            placeholder="Rédigez une publication"
            id=""
          />

          <select
            name=""
            id=""
            // onChange={}
            className="rounded-xl px-3 py-2"
          >
            <option className="bg-bg-secondary" value="Divers">
              Choisissez une catégorie
            </option>
          </select>

          <button
            type="submit"
            className="text-xl text-text-secondary bg-accent-primary hover:bg-accent-primaryhover mt-4 w-fit self-center px-6 py-2 rounded-xl font-text"
          >
            Publier
          </button>
        </form>

        <button
          type="button"
          onClick={closeModal}
          className="flex justify-center absolute top-0 right-2 w-7 h-7 bg-accent-primary hover:bg-accent-primaryhover text-bg-primary rounded-lg"
        >
          x
        </button>
      </div>
    </>
  );
}

export default PostModal;

// transformer l'image en url pour pouvoir la stocker dans la bdd
// lier le bouton publier à la bdd (create)
