export default function Masthead({ hero, person }) {
  return (
    <section className="masthead relative w-full flex flex-col border-b-2 border-[#111] px-2 sm:px-5 pt-4 sm:pt-8 pb-6 sm:pb-10">
      {/* Focus-tag dateline */}
      <div className="mastheadDateline flex flex-wrap items-center gap-2 sm:gap-3 text-[#1B1B19] text-xs sm:text-sm md:text-[1.1em] font-extrabold tracking-[2px] uppercase mb-3 sm:mb-5">
        {hero.focusTags.map((tag, i) => (
          <span key={i} className="contents">
            {i > 0 && <span className="opacity-50">·</span>}
            <span>{tag}</span>
          </span>
        ))}
        <span className="hidden sm:block flex-1 h-[2px] bg-[#888] ml-2" />
      </div>

      {/* Charcoal name block */}
      <div className="mastheadNameBlock w-full flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[10px] sm:rounded-[15px] py-4 sm:py-8 md:py-10">
        <p className="text-[#E2D9C8] font-[Canopee,serif] tracking-[2px] sm:tracking-[4px] text-5xl sm:text-7xl md:text-8xl lg:text-[9em] leading-none">
          {hero.name}
        </p>
      </div>

      {/* Role headline */}
      <h1 className="mastheadHeadline text-[#1B1B19] font-extrabold mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl lg:text-[4.5em] leading-tight">
        {hero.headline}
      </h1>
      <p className="mastheadSubhead text-[#444] mt-2 sm:mt-3 text-base sm:text-xl md:text-2xl lg:text-[1.8em] tracking-[1px]">
        {hero.subhead}
      </p>

      {/* Portrait + intro + credentials + CTAs */}
      <div className="mastheadBody flex flex-col lg:flex-row gap-5 sm:gap-8 mt-6 sm:mt-10">
        {hero.portrait && (
          <div
            className="mastheadPortrait bg-cover bg-center rounded-[12px] sm:rounded-[15px] border-2 border-[#222] sepia-[35%] h-[280px] sm:h-[360px] md:h-[420px] w-full lg:w-[340px] xl:w-[400px] flex-shrink-0"
            style={{ backgroundImage: `url(${hero.portrait})` }}
          />
        )}

        <div className="mastheadInfo flex flex-col justify-between flex-1 gap-5 sm:gap-6">
          <p className="mastheadIntro text-[#222] text-base sm:text-xl md:text-2xl lg:text-[2em] leading-snug tracking-[0.5px]">
            {hero.intro}
          </p>

          {hero.credentials?.length > 0 && (
            <div className="mastheadCredentials flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {hero.credentials.map((c, i) => (
                <div
                  key={i}
                  className="credentialCard border-2 border-[#222] rounded-[12px] bg-[#E2D9C8] px-4 sm:px-5 py-3 flex flex-col min-w-[200px]"
                >
                  <span className="text-[#1B1B19] font-extrabold text-sm sm:text-base md:text-[1.2em] leading-tight">
                    {c.label}
                  </span>
                  <span className="text-[#555] text-xs sm:text-sm md:text-[1em] tracking-[0.5px] mt-1">
                    {c.org}
                  </span>
                </div>
              ))}
            </div>
          )}

          {hero.ctas?.length > 0 && (
            <div className="mastheadCtas flex flex-wrap gap-3 sm:gap-5">
              {hero.ctas.map((cta, i) => (
                <a
                  key={i}
                  href={`/${person}/${cta.href}`}
                  className="ctaButton border-2 border-[#222] rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg md:text-[1.4em] font-extrabold tracking-[1px] cursor-pointer transition-all duration-300 hover:bg-[#1B1B19] hover:text-[#E2D9C8] hover:scale-105"
                >
                  {i === 0 ? "‹ " : ""}{cta.label}{i === 0 ? " ›" : ""}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
