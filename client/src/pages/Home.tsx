const posts = [
  {
    id: 1,
    username: "Sophie Lambert",
    avatar: "./src/assets/images/demo/woman1.jpg",
    image: "./src/assets/images/demo/fog.jpg",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus deserunt amet modi error officia! Commodi, corporis tenetur aspernatur quisquam nostrum aliquid dignissimos quo molestiae, ipsum, odio alias ad delectus vitae expedita. Molestias itaque facere architecto modi beatae ut dignissimos officiis numquam cumque vero adipisci, necessitatibus sequi dolor voluptatum?",
    date: "23/11/2024",
    hour: "13h54",
    category: "Divers",
  },
  {
    id: 2,
    username: "Adrien Morel",
    avatar: "./src/assets/images/demo/man.jpg",
    // image: "./src/assets/images/demo/sea.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!",
    date: "14/10/2024",
    hour: "9h36",
    category: "Emploi",
  },
  {
    id: 3,
    username: "Clara Duval",
    avatar: "./src/assets/images/demo/woman2.jpg",
    image: "./src/assets/images/demo/landscape.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur eos consequuntur maiores minima repellendus. Dicta, voluptatum ut?",
    date: "09/08/2024",
    hour: "22:45",
    category: "Divers",
  },
];

import settings from "../assets/images/settings.svg";

function Home() {
  return (
    <section className="w-full flex flex-col flex-grow gap-5 lg:gap-10 items-center">
      {posts.map((post) => (
        <article
          key={post.id}
          className="h-auto  lg:w-2/3 flex flex-col px-10 py-4 bg-bg_opacity-primary z-10 rounded-xl  border-2 border-bg_opacity-secondary font-text gap-2 text-text-primary font-light "
        >
          <header className="flex justify-between items-center py-2">
            <section className="flex items-center gap-4">
              <figure>
                <img
                  src={post.avatar}
                  alt=""
                  aria-labelledby="username"
                  className="size-12 rounded-full object-cover"
                />
              </figure>
              <h2 id="username">{post.username}</h2>
            </section>

            <section className="flex items-center gap-4">
              <span className="text-sm font-normal px-3 bg-[#176b1d]  border-2 border-accent-primary rounded">
                {post.category}
              </span>
              <button type="button">
                <figure className="p-1 rounded-md transition-colors bg-accent-secondary hover:bg-accent-primary">
                  <img src={settings} alt="" className="size-5" />
                </figure>
              </button>
            </section>
          </header>

          <main className="flex flex-col">
            {post.image ? (
              <figure>
                <img
                  src={post.image}
                  alt=""
                  className="rounded-md object-cover"
                />
              </figure>
            ) : (
              ""
            )}
            <p className="text-sm mt-6">{post.content}</p>
            <hr className="border-accent-primary mt-6 mb-2" />
            <p className="text-xs flex gap-1">
              Le<span>{post.date}</span>à<span>{post.hour}</span>
            </p>
          </main>
        </article>
      ))}
    </section>
  );
}

export default Home;
