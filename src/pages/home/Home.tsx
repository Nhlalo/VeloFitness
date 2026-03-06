// import Container from "../../components/shared/Container";
import WorkOutVideo from "../../assets/videos/herobanner.mp4";

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
export default function Home() {
  return (
    <>
      <HeroBanner />
    </>
  );
}
