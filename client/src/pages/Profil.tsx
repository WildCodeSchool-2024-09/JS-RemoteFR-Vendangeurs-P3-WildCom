function Profil() {
  return (
    <section className="relative z-10 flex gap-16 mx-0 bg-bg_opacity-primary border-bg_opacity-secondary font-text text-text-primary pb-11">
      <div className="gap-4 pt-4 mx-4">
        <img
          className="w-48 mb-6 rounded-full "
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
  );
}

export default Profil;
