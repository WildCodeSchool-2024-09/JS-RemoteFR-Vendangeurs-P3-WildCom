function Profil() {
  const posts = [
    {
      id: 1,
      username: "Sam Diswar",
      avatar: "src/assets/images/pictureprofil.webp",
      image: "src/assets/images/gamer-playing-indoors-side-view.jpg",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus deserunt amet modi error officia! Commodi, corporis tenetur aspernatur quisquam nostrum aliquid dignissimos quo molestiae, ipsum, odio alias ad delectus vitae expedita. Molestias itaque facere architecto modi beatae ut dignissimos officiis numquam cumque vero adipisci, necessitatibus sequi dolor voluptatum?",
      date: "23/11/2024",
      hour: "13h54",
      category: "Divers",
    },
  ];

  return (
    <>
      <section className="relative z-10 flex gap-16 mx-0 bg-bg_opacity-primary border-bg_opacity-secondary font-text text-text-primary pb-11">
        <div className="gap-4 pt-4 mx-4">
          <img
            className="w-48 mb-6 rounded-full"
            src="src/assets/images/pictureprofil.webp"
            alt="profile user"
          />
          <p>Biographie :</p>
        </div>
        <div className="flex flex-col gap-8 pt-3">
          <p className="text-2xl font-bold">Sam Diswar</p>
          <ul className="space-y-4">
            <li>Github : </li>
            <li>Linkedin : </li>
            <li>Sites : </li>
          </ul>
        </div>
      </section>
      <section className="flex justify-center mx-4 mt-8 posts">
        {posts.map((post) => (
          <article
            key={post.id}
            className="z-10 flex flex-col h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary "
          >
            <header className="flex items-center mb-4">
              <img
                className="w-10 h-10 mr-4 rounded-full"
                src={post.avatar}
                alt={`${post.username}'s avatar`}
              />
              <div>
                <h2 className="text-lg font-bold">{post.username}</h2>
                <p className="text-sm text-gray-600">
                  {post.date} à {post.hour}
                </p>
              </div>
            </header>
            <main className="flex flex-col">
              {post.image && (
                <figure>
                  <img
                    src={post.image}
                    alt=""
                    className="object-cover rounded-md"
                  />
                </figure>
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
    </>
  );
}

export default Profil;
