import { getPersonContent } from "@/lib/content";
import ContactBanner from "@/components/ContactBanner";
import ComingSoon from "@/components/ComingSoon";

function safeGet(person, file) {
  try {
    return getPersonContent(person, file);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { person } = await params;
  const profile = getPersonContent(person, "profile");
  const title = `${profile.siteName} - Talks`;
  const description = `Talks & speaking by ${profile.siteName} — ${profile.siteDescription}`;
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: profile.siteName }] },
    twitter: { card: "summary_large_image", title, description, images: ["/assets/og-image.webp"] },
  };
}

export default async function TalksPage({ params }) {
  const { person } = await params;
  const talks = safeGet(person, "talks");

  if (!talks) {
    return (
      <>
        <ComingSoon title="Talks Coming Soon" />
        <ContactBanner person={person} />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="introSection mt-5 px-3 sm:px-6 md:px-10 flex flex-col items-center w-full">
        <div className="headingText text-2xl sm:text-6xl md:text-[10em] lg:text-[13em] w-full h-[70px] sm:h-[250px] md:h-[350px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[10px] sm:rounded-[15px] tracking-[3px] sm:tracking-[5px]">
          <p className="text-[#E2D9C8] transform scale-y-[1.6]">{talks.heading}</p>
        </div>
        <div className="descriptionText text-lg sm:text-2xl md:text-[3em] lg:text-[5em] mt-3 sm:mt-5 w-full text-left leading-snug sm:leading-[50px] md:leading-[80px]">
          <p className="text-[#1B1B19]">{talks.description}</p>
        </div>
      </section>

      {/* Talks List */}
      {talks.sessions?.length > 0 ? (
        <section className="talks mt-5 p-3 sm:p-6 md:p-10 flex flex-col items-left w-full gap-3 sm:gap-5 overflow-hidden">
          {talks.sessions.map((talk, index) => {
            const Row = (
              <div
                className={
                  "relative min-h-[50px] sm:min-h-[60px] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-t-2 border-b-2 border-[#111] px-3 sm:px-6 py-2 sm:py-3 gap-2 sm:gap-0 transition-colors duration-300" +
                  (talk.link ? " hover:bg-[#1B1B19] hover:text-[#E2D9C8] cursor-pointer group" : "")
                }
              >
                <div className="flex-1 flex flex-col overflow-hidden">
                  <p className="talkTitle font-extrabold text-sm sm:text-lg md:text-xl lg:text-2xl text-left tracking-[1px] sm:tracking-[2px]">
                    {talk.title}
                  </p>
                  {talk.venue && (
                    <p className="talkVenue text-[#555] group-hover:text-[#bdb39c] text-xs sm:text-sm md:text-base tracking-[0.5px] mt-1 transition-colors duration-300">
                      {talk.venue}
                    </p>
                  )}
                </div>
                <div className="flex flex-row gap-2 sm:gap-3 items-center flex-shrink-0">
                  <p className="talkDate text-[#222] group-hover:text-[#E2D9C8] text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap transition-colors duration-300">
                    {talk.date}
                  </p>
                  {talk.isNew && (
                    <span className="newTag flex h-[24px] sm:h-[28px] px-2 text-xs sm:text-sm md:text-base text-[#ffc] bg-[#B63B12] items-center justify-center rounded-[5px]">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            );
            return talk.link ? (
              <a key={index} href={talk.link} target="_blank" rel="noopener noreferrer">
                {Row}
              </a>
            ) : (
              <div key={index}>{Row}</div>
            );
          })}
        </section>
      ) : (
        <ComingSoon title="Talks Coming Soon" />
      )}

      {/* Contact Banner */}
      <ContactBanner person={person} />
    </>
  );
}
