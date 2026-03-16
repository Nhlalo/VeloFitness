import { useNavigate } from "react-router";
import WorkOutVideo from "../../assets/videos/class-herobanner.mp4";

function HeroBanner() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/jointoday");
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <video
        src={WorkOutVideo}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
        className="pointer-events-none h-full w-full scale-x-[-1] object-cover lg:h-auto"
      >
        Your browser does not support the video tag
      </video>
      <div className="absolute top-[50%] -translate-y-1/2 pl-8">
        <h1 className="flex flex-col text-5xl md:text-7xl">
          <span className="text-white">DESIGN FOR THE INDIVIDUAL. </span>
          <span className="text-transparent [-webkit-text-stroke:2px_white]">
            POWERED BY THE COLLECTIVE.
          </span>
        </h1>
        <button
          onClick={handleClick}
          className="m-2 rounded-md bg-[#AAFF00] px-5 py-3 text-white hover:bg-[#9EF200] md:px-8 md:py-4"
        >
          BOOK A CLASS
        </button>
      </div>
    </section>
  );
}

export default function Classes() {
  return <HeroBanner />;
}
