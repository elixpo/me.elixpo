import { getPersonContent } from "@/lib/content";
import CopyEmail from "@/components/CopyEmail";

export default async function ConnectPage({ params }) {
  const { person } = await params;
  const connectData = getPersonContent(person, "connect");

  return (
    <>
      {/* Header */}
      <section className="flex flex-col items-center justify-center mt-10 mb-10">
        <div className="headingText text-[10em] w-full max-w-[900px] h-[200px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[5px]">
          <p className="text-[#E2D9C8] font-extrabold scale-y-[1.2]">{connectData.heading}</p>
        </div>
        <p className="descriptionText mt-6 text-[2em] text-[#1B1B19] text-center max-w-[900px]">
          {connectData.description}
        </p>
      </section>

      {/* Email Click-to-Copy */}
      <section className="flex flex-col items-center gap-4 mt-10 mb-10 px-4">
        <h2 className="emailProvoke text-[#1B1B19] text-[2.5em] font-extrabold tracking-wide mb-4">
          Mail me directly
        </h2>
        {connectData.emails.map((email) => (
          <CopyEmail key={email} email={email} />
        ))}
      </section>

      {/* Social Links */}
      <section className="flex flex-row flex-wrap justify-center items-center gap-10 sm:gap-16 mt-10 mb-16 px-4">
        {connectData.socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="bg-[#1B1B19] rounded-full p-5 hover:opacity-80 transition-all duration-300">
              <ion-icon name={social.icon} style={{ fontSize: "2.5em", color: "#E2D9C8" }}></ion-icon>
            </div>
            <span className="mt-2 text-[#1B1B19] text-[1.1em] font-bold">{social.platform}</span>
          </a>
        ))}
      </section>

      {/* Contact Image */}
      {connectData.contactImage && (
        <div className="flex justify-center mb-10">
          <div
            className="bgConnectImage relative h-[350px] w-[350px] bg-cover bg-center rounded-[12px] opacity-55 mix-blend-darken border-2 border-[#222]"
            style={{ backgroundImage: `url(${connectData.contactImage})` }}
          />
        </div>
      )}

      {/* Separator */}
      <div className="w-full border-t-2 border-[#222] mt-10" />
    </>
  );
}
