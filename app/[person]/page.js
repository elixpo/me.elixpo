import { getPersonContent } from "@/lib/content";
import ContactBanner from "@/components/ContactBanner";

export default async function HomePage({ params }) {
  const { person } = await params;
  const home = getPersonContent(person, "home");
  const spotlight = getPersonContent(person, "spotlight");
  const recommendations = getPersonContent(person, "recommendations");

  return (
    <>
      {/* Spotlight Section */}
      <section className="spotlight relative h-[350px] mb-[20px] pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-[40px] md:pr-[40px] box-border py-[40px] gap-[20px] overflow-x-auto overflow-y-hidden flex-nowrap flex flex-row select-none cursor-grabbing">
        {spotlight.map((news, index) => {
          const midIndex = Math.floor(spotlight.length / 2);
          return (
            <span key={index} className="contents">
              {index === midIndex && (
                <div className="featuredTileSpecial relative h-[350px] w-[450px] flex-shrink-0 flex flex-col items-center mt-[10px] border-r-2 border-l-2 border-[#888] px-5">
                  <p className="featuredTileSpecialText text-[4em] font-extrabold tracking-wide relative">SPOTLIGHT!</p>
                  <p className="featuredTileSpecialDesc text-[1.8em] font-thin relative text-center">Welcome to the latest catches -- in my career and let&apos;s find the craziest!!</p>
                  <p className="featuredTileSpecialTip relative text-[1.5em] font-extrabold text-center top-[70px]">&lt;&lt; Watch! More to Come &gt;&gt;</p>
                </div>
              )}
              <div className="featuredTile relative h-[350px] w-[400px] flex-shrink-0 flex flex-col items-center mt-[10px]">
                <div
                  className="featuredImage hoverScale h-[150px] w-[90%] bg-cover bg-center rounded-[12px]"
                  style={{ backgroundImage: `url(${news.image})` }}
                />
                <span className="featuredName relative w-full flex flex-row px-[20px] items-center justify-between box-border">
                  <p className="featureName text-left text-[1.5em]">{news.title}</p>
                </span>
                <p className="featuredDescription relative text-[1.35em] text-left px-[20px] whitespace-normal break-words w-full text-ellipsis overflow-hidden">
                  {news.description.slice(0, 150)}...
                </p>
              </div>
            </span>
          );
        })}
      </section>

      {/* Intro Section */}
      <section className="introSection relative mt-[10px] w-full flex flex-col border-b-2 border-[#111] p-5">
        <div className="nameContainer text-4xl sm:text-6xl md:text-8xl lg:text-[12em] xl:text-[20em] w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[2px] sm:tracking-[3px] md:tracking-[5px]">
          <p className="text-[#E2D9C8]">{home.intro.heroName}</p>
        </div>

        <div id="punchlineSection" className="punchlineSection w-full flex flex-col lg:flex-row p-4 sm:p-6 md:p-10 gap-5 lg:gap-10 mt-5">
          <div className="column1 flex flex-col w-full lg:w-1/2 h-full p-4 sm:p-6 md:p-10 lg:border-r-2 border-[#888]">
            <div className="text1">
              <p className="text-[#1B1B19] text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-[8em] font-extrabold">
                {home.intro.tagline}
              </p>
              <p className="text-[#1B1B19] text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-[8em]">
                {home.intro.taglineSuffix}
              </p>
            </div>
            <div
              className="image1 bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full rounded-[15px] mt-5"
              style={{ backgroundImage: `url(${home.intro.images.portrait})` }}
            />
            <div className="description1">
              <p className="relative mt-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[2em] tracking-[1px]">
                {home.intro.description}
              </p>
            </div>
          </div>
          <div className="column1 flex flex-col w-full lg:w-1/2 h-full">
            <div
              className="image2 bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[750px] w-full rounded-[15px] mt-5"
              style={{ backgroundImage: `url(${home.intro.images.landscape})` }}
            />
            {home.intro.highlights.map((hl, i) => (
              <div
                key={i}
                className="col2text relative mt-10 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[4em]"
              >
                {hl}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Section */}
      <section id="websiteSection" className="websiteSection relative mt-[10px] w-full flex flex-col border-b-2 border-[#111] p-2 sm:p-4 md:p-5">
        <div className="websiteContainer flex flex-col lg:flex-row items-center h-auto lg:h-[250px] w-full mt-10 justify-between gap-5">
          <div className="relative websiteTextContainer text-4xl sm:text-6xl md:text-8xl lg:text-[12em] xl:text-[16em] w-full lg:w-[70%] flex justify-center items-center h-[150px] sm:h-[200px] lg:h-[250px] bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px]">
            <p className="text-[#E2D9C8] tracking-wide">WEBSITE</p>
          </div>
          <div
            className="stampImage bg-cover bg-center h-[150px] sm:h-[200px] lg:h-full w-[150px] sm:w-[200px] lg:w-[250px] mx-auto lg:mx-0"
            style={{ backgroundImage: `url(${home.websiteSection.images.seal})` }}
          />
        </div>
        <div className="websiteInfoSection relative w-full flex flex-col lg:flex-row mt-10">
          <div className="webCol1 w-full lg:w-[70%] flex flex-col gap-10 justify-around lg:border-r-2 border-[#888] p-2 sm:p-4 md:p-5">
            <div className="webCol1Row1 flex flex-col lg:flex-row w-full gap-5">
              <div className="slide1 items-center flex flex-col p-2 sm:p-4 md:p-5 lg:border-r-2 border-[#888] lg:mr-5">
                <div
                  className="slide1Img hoverScale bg-cover bg-center h-[150px] sm:h-[180px] md:h-[200px] w-full sm:w-[350px] md:w-[400px]"
                  style={{ backgroundImage: `url(${home.websiteSection.images.owl})` }}
                />
                <p className="webCol1Row1Text1 text-[#1B1B19] text-left w-full text-base sm:text-lg md:text-xl lg:text-[1.8em] mt-4">
                  Designed By
                </p>
                <p className="webDescription1 relative flex text-xs sm:text-sm md:text-base lg:text-[1.3em] text-left w-full sm:w-[350px] md:w-[400px] whitespace-normal break-words h-auto min-h-[30px]">
                  {home.websiteSection.designedBy}
                </p>
              </div>
              <div className="slide2 items-center flex-col">
                <div className="slide2text1 mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-[5em]">Future Plans</div>
                <div className="slide2description">
                  <p className="webDescription2 relative flex text-[1.3em] sm:text-sm mt-6 md:text-base lg:text-[1.5em] text-left w-full sm:w-[350px] md:w-[400px] whitespace-normal break-words h-auto min-h-[50px]">
                    {home.websiteSection.futurePlans}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="webCol1Row2 flex bg-cover bg-center h-[400px] sm:h-[600px] md:h-[800px] w-full p-4 sm:p-6 md:p-10"
              style={{ backgroundImage: `url(${home.websiteSection.images.humanThink})` }}
            />
          </div>
          <div className="webCol2 w-full lg:w-[30%] flex mt-5 flex-col items-center gap-10 p-2 sm:p-4 md:p-5">
            <div className="webCol2text1 text-left w-full">
              <div className="relative text-[#1B1B19] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[4em] font-extrabold line-through">
                Wasting Time
              </div>
              <div className="relative text-[#1B1B19] leading-[50px] sm:leading-[70px] md:leading-[100px] text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[10em] font-extrabold">
                CODE
              </div>
            </div>
            <div className="webCol2Desc1">
              <p className="webDescription3 relative flex text-xs sm:text-sm md:text-base lg:text-lg xl:text-[1.8em] text-left w-full sm:w-[300px] md:w-[350px] whitespace-normal break-words h-auto min-h-[30px] lg:px-[10px]">
                {home.websiteSection.codeStory}
              </p>
              <a
                href={`/${person}/projects`}
                id="projectsRedirect"
                className="visitCircle w-full sm:w-[300px] md:w-[350px] h-[80px] sm:h-[100px] text-lg sm:text-xl md:text-2xl lg:text-[3em] border-2 border-[#222] rounded-full mt-20 flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#1B1B19] hover:text-[#E2D9C8] hover:scale-105 mx-auto lg:ml-[20px]"
              >
                Visit Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendationSection" className="recommendationSection relative h-[450px] mb-[20px] pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-[40px] md:pr-[40px] box-border py-[40px] gap-[20px] overflow-x-auto overflow-y-hidden flex-nowrap flex flex-row mt-20">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="recommendationCard shrink-0 relative h-[400px] w-[650px] border-4 border-[#222] rounded-[25px] bg-[#E2D9C8] p-5 justify-center items-center mr-5 cursor-pointer hover:brightness-[85%] transition-all duration-300 ease-in-out"
          >
            <div className="dottedContainer relative h-full w-full border-2 border-dashed border-[#222] rounded-[30px] flex flex-col gap-5 p-10 justify-between">
              <p className="quote text-[#333] text-[1.55em] whitespace-normal break-words underline decoration-1 decoration-[0.05rem] decoration-[#888] underline-offset-[6px]">
                &ldquo;{rec.content.slice(0, 200)}...&rdquo;
              </p>
              <div className="attribution flex flex-row items-center gap-5">
                <div
                  className="userLogo relative bg-cover bg-center h-[80px] w-[80px] border-2 border-[#222] rounded-[50%] grayscale sepia-[50%]"
                  style={{ backgroundImage: `url(${rec.image})` }}
                />
                <div className="userInfo flex flex-col gap-1 leading-[30px]">
                  <div className="userName font-extrabold text-[2.5em] relative tracking-wide">{rec.name}</div>
                  <div className="userDesig font-thin text-[2em] relative">{rec.designation}</div>
                </div>
              </div>
              <div
                className="stamp absolute bottom-[20px] right-[20px] h-[80px] w-[80px] bg-cover bg-center"
                style={{ backgroundImage: `url(/assets/${person}/projects/stamp-2.png)` }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Tech Section */}
      <section className="techTracks overflow-hidden w-full flex flex-col mt-10 pt-5 pb-5 justify-center select-none overflow-y-hidden">
        <div className="row1 relative w-full flex flex-col lg:flex-row gap-5">
          <div className="row1col1 relative w-full flex flex-col sm:flex-row gap-4 sm:gap-10 items-start h-auto sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <div
              className="image1row1col1techTracks w-[60px] sm:w-[80px] md:w-[100px] h-[200px] sm:h-[250px] md:h-full bg-cover bg-center rounded-[15px] mx-auto sm:mx-0"
              style={{ backgroundImage: `url(${home.techSection.images.wand})` }}
            />
            <p className="text1row1col1techTracks h-auto sm:h-full flex items-center text-[#1B1B19] text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-[13em] font-extrabold leading-tight sm:leading-[80px] md:leading-[120px] lg:leading-[160px] text-center sm:text-left">
              {home.techSection.heading.split(" ").map((word, i, arr) => (
                <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
          <div
            className="row1col2 relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center rounded-[15px]"
            style={{ backgroundImage: `url(${home.techSection.images.landscape})` }}
          />
        </div>
        <div className="row2 flex flex-col w-full mt-10">
          <div className="row2row1 flex flex-col lg:flex-row w-full gap-5 lg:gap-10">
            <div
              className="row1col2 relative w-full lg:w-[850px] h-[300px] sm:h-[350px] md:h-[400px] border-2 border-[#222] bg-cover bg-center mix-blend-multiply rounded-[25px]"
              style={{ backgroundImage: `url(${home.techSection.images.banner})` }}
            />
            <div className="text1row1col1techTracks h-full flex flex-row flex-wrap items-left text-[#1B1B19] leading-[40px] sm:leading-[60px] md:leading-[75px] font-extrabold text-left w-full gap-4 sm:gap-6 md:gap-10">
              {home.techSection.skills.map((skill, i) =>
                skill.type === "icon" ? (
                  <img
                    key={i}
                    width={40}
                    height={40}
                    className="sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
                    src={skill.src}
                    alt={skill.alt}
                  />
                ) : (
                  <p key={i} className="font-extrabold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[2em]">
                    {skill.label}
                  </p>
                )
              )}
            </div>
          </div>
          <div className="row2row2 flex flex-col lg:flex-row w-full gap-5 lg:gap-10 mt-10">
            <div className="relative websiteTextContainer text-4xl sm:text-6xl md:text-8xl lg:text-[15em] xl:text-[25em] w-full lg:w-[70%] flex justify-center items-center h-[250px] sm:h-[350px] md:h-[450px] bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px]">
              <p className="text-[#E2D9C8] tracking-wide font-extrabold">{home.techSection.subheading}</p>
            </div>
            <p className="descriptionRow2 w-full lg:w-[20%] text-xs sm:text-sm md:text-base lg:text-lg xl:text-[1.4em] opacity-90 text-[#333]">
              {home.techSection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <ContactBanner person={person} />
    </>
  );
}
