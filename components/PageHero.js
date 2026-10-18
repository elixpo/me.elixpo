export default function PageHero({ person, memberName, eyebrow, title, italic, description, facts = [], children }) {
  return (
    <section className="portfolio-page-hero">
      <div className="portfolio-geometry" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="portfolio-page-hero-copy">
        <p className="portfolio-eyebrow">{eyebrow}</p>
        <h1>
          {title} {italic && <em>{italic}</em>}
        </h1>
        {description && <p className="portfolio-lede">{description}</p>}
        {children}
      </div>
      <aside className="portfolio-hero-aside">
        {person && (
          <figure className="portfolio-page-portrait">
            <img
              src={`/assets/${person}/about/landing-card.webp`}
              alt={`Portrait of ${memberName || person}`}
              fetchPriority="high"
            />
          </figure>
        )}
        {facts.length > 0 && (
          <dl className="portfolio-hero-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dd>{fact.value}</dd>
                <dt>{fact.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </aside>
    </section>
  );
}
