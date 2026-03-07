import Container from "../../components/shared/Container";
import WorkOutVideo from "../../assets/videos/herobanner.mp4";
import TenseTraining from "../../assets/images/tensetraining.jpg";
import TenseTraining2 from "../../assets/images/tenseTraining.jpg";

function HeroBanner() {
  return (
    <section className="relative h-[88vh]">
      <video
        src={WorkOutVideo}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
        className="pointer-events-none h-full w-full scale-x-[-1] object-cover"
      >
        Your browser does not support the video tag
      </video>
      <div className="absolute top-[30%] pl-8">
        <h1 className="flex flex-col text-5xl md:text-7xl">
          <span className="text-[#1d1d1f]">DESIGN YOUR</span>
          <span className="text-transparent [-webkit-text-stroke:2px_#1d1d1f]">
            PHYSIQUE
          </span>
        </h1>
        <button className="m-2 rounded-md bg-[#AAFF00] px-5 py-3 text-[#1d1d1f] hover:bg-[#9EF200] md:px-8 md:py-4">
          GET STARTED
        </button>
      </div>
    </section>
  );
}
function Classes() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-8 py-20 lg:flex-row">
        <div className="max-w-125 flex-1 items-center justify-center py-9">
          <div className="relative max-w-125">
            <img
              src={TenseTraining}
              alt="tense training"
              className="w-full rounded-lg"
            />
            <img
              src={TenseTraining2}
              alt="tense training"
              className="absolute -bottom-[20%] -left-[5%] ml-2 max-h-43 max-w-[50%] rounded-lg"
            />
          </div>
        </div>
        <div className="relative flex max-w-125 flex-1 flex-col items-center py-9 lg:max-w-full">
          <h2 className="mb-4 w-full text-left text-4xl font-semibold">
            THE CLASS YOU WILL GET HERE
          </h2>
          <p className="mr-auto mb-9 max-w-[75ch] lg:mb-16">
            Our signature class combines high-energy cardio, strength training,
            and functional movements—all guided by expert coaches who know how
            to motivate. Designed to challenge you at every level, it's the
            perfect formula for continuous progress. Each 45-minute session is
            crafted to maximize your time and deliver results, whether you're a
            beginner or a seasoned athlete. You'll leave every class feeling
            stronger, energized, and accomplished. Join us and discover why our
            members call this the best workout they've ever had.{" "}
          </p>
          <button className="m-2 mr-auto rounded-md bg-[#AAFF00] px-5 py-3 text-[#1d1d1f] hover:bg-[#9EF200] md:px-8 md:py-4">
            Book A Class
          </button>
        </div>
      </div>
    </Container>
  );
}
export default function Home() {
  return (
    <>
      <HeroBanner />
      <Classes />
    </>
  );
}
