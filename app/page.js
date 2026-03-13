import { getValidPersons, getPersonContent } from "@/lib/content";
import Link from "next/link";

export default function LandingPage() {
  const persons = getValidPersons();
  const profiles = persons.map((p) => ({
    slug: p,
    ...getPersonContent(p, "profile"),
  }));

  return (
    <div className="relative min-h-screen bg-[#1B1B19] flex flex-col items-center justify-center overflow-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 opacity-10 bg-[url(/assets/ayushman/paperTexture.jpg)] bg-repeat bg-contain pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-[#E2D9C8] text-6xl sm:text-8xl md:text-[10em] font-extrabold tracking-[8px] select-none">
          ELIXPO
        </h1>
        <p className="text-[#888] text-lg sm:text-xl md:text-2xl mt-4 tracking-widest">
          Choose your portfolio
        </p>
      </div>

      {/* Person Cards */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-8 sm:gap-16 px-6">
        {profiles.map((profile) => (
          <Link
            key={profile.slug}
            href={`/${profile.slug}`}
            className="group relative w-[300px] sm:w-[350px] h-[400px] border-2 border-[#444] rounded-[20px] bg-[#E2D9C8] p-6 flex flex-col justify-between transition-all duration-500 hover:scale-105 hover:border-[#ffc300] hover:shadow-[0_0_40px_rgba(255,195,0,0.15)]"
          >
            {/* Portrait */}
            <div
              className="w-full h-[220px] rounded-[12px] bg-cover bg-center border-2 border-[#222] sepia-[40%] saturate-[180%] group-hover:sepia-0 group-hover:saturate-100 transition-all duration-500"
              style={{
                backgroundImage: `url(/assets/${profile.slug}/about/ptr-11.png)`,
              }}
            />

            {/* Name */}
            <div className="mt-4">
              <h2 className="text-[#1B1B19] text-4xl sm:text-5xl font-extrabold tracking-wide">
                {profile.name}
              </h2>
              <p className="text-[#555] text-lg mt-1">{profile.siteName}</p>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 w-[50px] h-[50px] border-2 border-dashed border-[#222] rounded-full flex items-center justify-center group-hover:bg-[#1B1B19] group-hover:border-solid transition-all duration-300">
              <span className="text-[#222] text-2xl group-hover:text-[#E2D9C8] transition-colors duration-300">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer line */}
      <div className="relative z-10 mt-20 text-[#555] text-sm tracking-widest select-none">
        ELIXPO SERIES
      </div>
    </div>
  );
}
