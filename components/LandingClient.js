"use client";

import { useMemo, useState } from "react";

export default function LandingClient({ profiles }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return profiles;
    return profiles.filter((profile) =>
      [profile.name, profile.siteName, profile.siteDescription, profile.location]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(value))
    );
  }, [profiles, query]);

  return (
    <main className="registry-page">
      <header className="registry-nav">
        <a className="registry-brand" href="https://elixpo.com">
          <img src="/icon.png" alt="" width="34" height="34" />
          <span><strong>Elixpo</strong><small>Member portfolios</small></span>
        </a>
        <a className="portfolio-button portfolio-button-dark" href="https://elixpo.com/people">
          Organization directory <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="registry-hero">
        <div className="portfolio-geometry" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="registry-hero-copy">
          <p className="portfolio-eyebrow">Elixpo / people and their public work</p>
          <h1>Meet the people <em>behind the record.</em></h1>
          <p>
            Individual portfolios for Elixpo members, connecting projects, research,
            talks, writing, and the public evidence behind each person’s work.
          </p>
        </div>
        <div className="registry-count"><strong>{profiles.length}</strong><span>published profiles</span></div>
      </section>

      <section className="registry-directory">
        <div className="registry-directory-heading">
          <div>
            <p className="portfolio-eyebrow">Member directory</p>
            <h2>Choose a portfolio.</h2>
          </div>
          <label className="registry-search">
            <span className="sr-only">Search member portfolios</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people or disciplines" />
          </label>
        </div>

        <div className="registry-grid">
          {matches.map((profile, index) => (
            <a className="registry-card" href={`/${profile.slug}`} key={profile.slug}>
              <div className={`registry-card-art registry-card-art-${index % 4}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i /><i />
                <img src={`/assets/${profile.slug}/about/landing-card.webp`} alt={`Portrait of ${profile.name || profile.siteName}`} />
              </div>
              <div className="registry-card-copy">
                <p className="portfolio-eyebrow">{profile.location || "Elixpo member"}</p>
                <h2>{profile.name || profile.siteName}</h2>
                <p>{profile.siteDescription}</p>
                <b>Open portfolio <span aria-hidden="true">→</span></b>
              </div>
            </a>
          ))}
        </div>
        {matches.length === 0 && <p className="registry-empty">No portfolio matches that search.</p>}
      </section>
    </main>
  );
}
