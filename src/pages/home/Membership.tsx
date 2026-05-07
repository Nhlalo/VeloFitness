import { useNavigate } from "react-router";
import Img from "../../components/shared/Img";

export default function Membership() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/membership");
  }
  return (
    <section className="relative">
      <Img
        src="/gym-club.jpg"
        alt="Gym facility"
        isHidden={true}
        className="min-h-105"
        loading="lazy"
      />
      <div className="absolute top-0 left-0 mx-8 mt-4 flex-1 bg-white px-6 py-10 text-black sm:m-9 md:px-14 md:py-16">
        <h2 className="mb-6 text-[1.75rem] font-semibold lg:text-4xl">
          One Membership. <br /> Limitless Potential.
        </h2>
        <p className="mb-7 max-w-109 text-[#333]">
          Expert-led training sessions, personalized nutrition guidance, and
          relaxing spa facilities.
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="font-semibold text-black underline underline-offset-8"
        >
          Explore Member Benefits
        </button>
      </div>
    </section>
  );
}
