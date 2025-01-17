export default function Footer() {
  return (
    <section className="p-6 space-y-2 text-sm text-center text-text-primary">
      <p>
        &copy; 2025{" "}
        <span className="text-accent-primary font-title">&lt;WildCom/&gt;</span>
      </p>

      <a
        className="hover:text-accent-primary"
        href="mailto:creamedoc@gmail.com"
      >
        Contactez Nous
      </a>
    </section>
  );
}
