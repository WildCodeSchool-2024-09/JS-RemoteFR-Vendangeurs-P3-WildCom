import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

type CategoryFormProps = {
  onSubmit: (data: { name: string; type: string }) => void;
  type: string;
};

export const CategoryForm = ({ onSubmit, type }: CategoryFormProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState(type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);

    if (type === "post") {
      setNewType("post");
    } else {
      setNewType("event");
    }
  };

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit({ name: newCategory, type: newType });
        setNewCategory("");
      }}
    >
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={newCategory}
        className="w-2/3 px-3 py-2 text-sm rounded-l-lg text-text-secondary font-text lg:text-base"
        placeholder="Ajouter une catégorie..."
      />
      <button
        type="submit"
        className="flex items-center justify-center w-10 rounded-r-lg h-9 lg:h-10 bg-accent-primary"
      >
        <IoSendSharp className="w-5 h-5 " />
      </button>
    </form>
  );
};
