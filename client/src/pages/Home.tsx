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
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      {posts.map((post) => (
        <article
          key={post.id}
          className="z-10 flex flex-col h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary "
        >
          <header className="flex items-center justify-between py-2">
            <section className="flex items-center gap-4">
              <figure>
                <img
                  src={post.avatar}
                  alt=""
                  aria-labelledby="username"
                  className="object-cover rounded-full size-12"
                />
              </figure>
              <h2 id="username">{post.username}</h2>
            </section>

            <section className="flex items-center gap-4">
              <span className="text-sm font-normal px-3 bg-[#176b1d]  border-2 border-accent-primary rounded">
                {post.category}
              </span>
              <button type="button">
                <figure className="p-1 transition-colors rounded-md bg-accent-secondary hover:bg-accent-primary">
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
                  className="object-cover rounded-md"
                />
              </figure>
            ) : (
              ""
            )}
            <p className="mt-6 text-sm">{post.content}</p>
            <hr className="mt-6 mb-2 border-accent-primary" />
            <p className="flex gap-1 text-xs">
              Le<span>{post.date}</span>à<span>{post.hour}</span>
            </p>
          </main>
        </article>
      ))}
    </section>
  );
}

export default Home;
