// import Container from "../../components/shared/Container";
import WorkOutVideo from "../../assets/videos/herobanner.mp4";

function HeroBanner() {
  return (
    <section className="h-[88vh]">
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
