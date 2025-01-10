export default function Footer() {
  return (
    <section className="space-y-2 text-text-primary text-center p-6 text-sm">
      <p>
        &copy; 2025{" "}
        <span className="text-accent-primary font-title">&lt;WildCom/&gt;</span>
      </p>
      <p className="w-32 mx-auto">
        Made with <span>❤️</span> by <br />
        <a
          className="hover:text-accent-primary"
          href="mailto:creamedoc@gmail.com"
        >
          Contactez Nous
        </a>
      </p>
    </section>
  );
}
