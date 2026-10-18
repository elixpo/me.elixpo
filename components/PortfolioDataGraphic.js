export default function PortfolioDataGraphic({ eyebrow, title, description, items = [] }) {
  const visibleItems = items.filter((item) => item.value > 0).slice(0, 6);
  const maximum = Math.max(...visibleItems.map((item) => item.value), 1);

  if (visibleItems.length === 0) return null;

  return (
    <section className="portfolio-section portfolio-data-story" aria-label={title}>
      <div className="portfolio-data-copy">
        <p className="portfolio-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="portfolio-data-graphic">
        <div className="portfolio-data-orbit" aria-hidden="true"><i /><i /><i /></div>
        <ol>
          {visibleItems.map((item, index) => (
            <li key={item.label} style={{ "--metric-size": `${Math.max(12, (item.value / maximum) * 100)}%` }}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><b>{item.value}</b></div>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
