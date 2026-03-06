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
        className="pointer-events-none h-full w-full scale-x-[-1] object-cover"
      >
        Your browser does not support the video tag
      </video>
      <h1 className="absolute top-[30%] flex flex-col pl-8 text-5xl md:text-7xl">
        <span className="text-[#4B5563]">DESIGN YOUR</span>
        <span className="text-transparent [-webkit-text-stroke:2px_#4B5563]">
          PHYSIQUE
        </span>
      </h1>
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
