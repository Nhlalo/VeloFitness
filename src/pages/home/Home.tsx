// import Container from "../../components/shared/Container";
import WorkOutVideo from "../../assets/videos/herobanner.mp4";

function HeroBanner() {
  return (
    <section>
      <video
        src={WorkOutVideo}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controls={false}
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
