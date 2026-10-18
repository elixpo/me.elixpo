export default function Footer({ profile, person }) {
  const year = new Date().getFullYear();

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-top">
        <div>
          <p className="portfolio-eyebrow">Open-source work, recorded in public</p>
          <h2>Build carefully. <em>Explain clearly.</em></h2>
        </div>
        <a className="portfolio-button portfolio-button-light" href={`mailto:${profile.email}`}>
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="portfolio-footer-grid">
        <div>
          <strong>{profile.name || profile.siteName}</strong>
          <p>{profile.siteDescription}</p>
          <small>{profile.location}</small>
        </div>
        <nav aria-label="Portfolio links">
          {(profile.menuItems || []).map((item) => (
            <a key={item} href={item === "Home" ? `/${person}` : `/${person}/${item.toLowerCase()}`}>
              {item === "Publications" ? "Research" : item}
            </a>
          ))}
        </nav>
        <nav aria-label="Social profiles">
          {profile.socials?.map((social) => (
            <a key={social.platform} href={social.url} target="_blank" rel="noreferrer">
              {social.platform} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="portfolio-footer-bottom">
        <span>© {year} {profile.name || profile.siteName}</span>
        <span>Published through <a href="https://elixpo.com">Elixpo</a></span>
      </div>
    </footer>
  );
}
