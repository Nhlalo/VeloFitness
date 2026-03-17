import HeroBanner from "../../assets/images/membership-herobanner.jpg";

function Header() {
  return (
    <header className="relative h-[88vh] overflow-hidden bg-black">
      <img
        src={HeroBanner}
        alt="Group training"
        aria-hidden="true"
        className="pointer-events-none h-full w-full scale-x-[-1] object-cover lg:h-auto"
      />

      <div className="w-90% absolute top-[50%] m-auto -translate-y-1/2 pl-8">
        <h1 className="mb-10 flex flex-col text-5xl font-semibold uppercase md:text-[5rem]">
          <span className="text-white">Membership </span>
          <span className="text-white">With benefits</span>
        </h1>

        <p className="w-[90%] max-w-[75ch] text-lg text-white lg:text-2xl">
          From unlimited Signature Classes, unparalleled Personal Training, to
          iconic locations with exclusive amenities, Equinox membership unlocks
          everything you need to maximize your potential.
        </p>
      </div>
    </header>
  );
}
export default function Membership() {
  return (
    <>
      <Header />
    </>
  );
}
