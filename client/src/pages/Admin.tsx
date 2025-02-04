import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryForm } from "../components/Categories/CategoryForm";
import { useUpdate } from "../contexts/UpdateContext";

type Category = {
  id: number;
  name: string;
};

export default function Admin() {
  const { updateCategories, setUpdateCategories } = useUpdate();
  const [categories, setCategories] = useState({
    posts: [] as Category[],
    events: [] as Category[],
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const postCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/posts`,
        );
        const eventCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/events`,
        );

        setCategories({
          posts: postCategories.data,
          events: eventCategories.data,
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (updateCategories) {
      getCategories();
    }

    getCategories();
  }, [updateCategories]);

  return (
    <div className="flex flex-col justify-center gap-4">
      {/* Publications */}
      <div className=" relative z-10 w-screen flex flex-col h-auto gap-10 p-10  font-light border-2 lg:w-2/3 lg:mx-auto bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
        <h2 className="text-lg text-center font-title lg:text-xl">
          Catégories - Publications
        </h2>

        <ul className="flex flex-wrap gap-5 ">
          {categories.posts.map((category) => (
            <li
              key={category.id}
              className="text-sm font-normal px-2 bg-[#176b1d] border-2 border-accent-primary rounded"
            >
              {category.name}
            </li>
          ))}
        </ul>
        <CategoryForm
          onSubmit={(postCategoriesData) => {
            setUpdateCategories((prev) => prev + 1);
            axios.post(
              `${import.meta.env.VITE_API_URL}/api/categories`,
              postCategoriesData,
              { withCredentials: true },
            );
          }}
          type="post"
        />
      </div>

      {/* Événements */}
      <div className=" relative z-10 w-screen flex flex-col h-auto gap-10 p-10 font-light border-2 lg:w-2/3 lg:mx-auto bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
        <h2 className="text-lg text-center font-title lg:text-xl">
          Catégories - Événements
        </h2>

        <ul className="flex flex-wrap gap-5 ">
          {categories.events.map((category) => (
            <li
              key={category.id}
              className="text-sm font-normal px-2 bg-[#176b1d] border-2 border-accent-primary rounded"
            >
              {category.name}
            </li>
          ))}
        </ul>
        <CategoryForm
          onSubmit={(postCategoriesData) => {
            setUpdateCategories((prev) => prev + 1);
            axios.post(
              `${import.meta.env.VITE_API_URL}/api/categories`,
              postCategoriesData,
              { withCredentials: true },
            );
          }}
          type="event"
        />
      </div>
    </div>
  );
}
