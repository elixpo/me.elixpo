import { getPersonContent } from "@/lib/content";
import ContactBanner from "@/components/ContactBanner";

export default async function ProjectsPage({ params }) {
  const { person } = await params;
  const projectsData = getPersonContent(person, "projects");

  return (
    <>
      {/* Header */}
      <div className="headerTextContainer w-full p-2 flex h-[200px] flex-row justify-left gap-10">
        <div className="projectsHeaderText text-[10em] lg:text-[9em] w-1/2 flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[5px]">
          <p className="text-[#E2D9C8]">{projectsData.heading}</p>
        </div>
        <p className="w-1/2 relative flex-wrap break-words text-[#111] font-bold text-[1.4em]">
          {projectsData.description}
        </p>
      </div>

      {/* Projects List */}
      <section className="projectsContainer w-full mt-5 border-t-2 border-[#555] flex flex-col gap-10">
        {projectsData.projects.map((data, i) => (
          <div
            key={i}
            className="w-full flex flex-col items-center justify-center gap-1 border-b-2 border-[#222] pb-5"
          >
            <div className="px-5 flex flex-row justify-between items-center w-full">
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="projectName font-extrabold text-[2.3em] text-[#222] underline cursor-pointer underline-offset-[6px] decoration-[#555] transition-[0.25s] hover:text-[#66460c] font-[Canopee,serif] tracking-wide"
              >
                {data.name}
              </a>
              <span className="flex items-center gap-2 px-4 py-1 rounded-lg bg-[#66460c] shadow-lg">
                <p className="font-bold text-[1.1em] text-[#fff] tracking-wide drop-shadow">
                  {data.stars}
                </p>
                <span className="text-yellow-500 text-[1.5em]">&#9733;</span>
              </span>
            </div>
            <div className="w-full px-5 flex flex-row gap-2 justify-left items-center">
              <img
                src={data.ownerLogo}
                alt={data.owner}
                className="h-[20px] w-[20px] rounded-full"
              />
              <p className="text-[1.2em] text-[#555] font-semibold">
                from {data.owner}
              </p>
            </div>
            <div className="w-full px-5 flex flex-row justify-between">
              <p className="text-[1.2em] text-[#333] font-semibold w-[70%]">
                {data.description || "No description provided."}
              </p>
              {data.language && (
                <span className="text-[1em] text-[#888] font-mono">{data.language}</span>
              )}
            </div>
            {data.topics.length > 0 && (
              <div className="w-full px-5 mt-2 flex flex-row items-left justify-left gap-2 flex-wrap">
                {data.topics.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#664600] text-[#fff] text-[0.95em] font-medium border border-[#111]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Contact Banner */}
      <ContactBanner person={person} />
    </>
  );
}
