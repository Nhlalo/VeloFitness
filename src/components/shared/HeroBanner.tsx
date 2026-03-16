import { useNavigate } from "react-router";
import { HeroBannerProps } from "../../types/herobanner.interface";

export default function HeroBanner({
  videoSource,
  heading1,
  heading2,
  buttonText,
}: HeroBannerProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/jointoday");
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <video
        src={videoSource}
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
          <span className="text-white">{heading1} </span>
          <span className="text-transparent [-webkit-text-stroke:2px_white]">
            {heading2}
          </span>
        </h1>
        <button
          onClick={handleClick}
          className="mx-2 mt-6 rounded-md bg-[#AAFF00] px-5 py-3 text-white hover:bg-[#9EF200] md:px-8 md:py-4"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
