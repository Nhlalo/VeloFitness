import PeopleTraining from "../../assets/images/people-training.jpg";

function Header() {
  return (
    <header className="relative h-screen overflow-hidden bg-black">
      <img
        src={PeopleTraining}
        alt="Group training"
        aria-hidden="true"
        className="pointer-events-none h-full w-full scale-x-[-1] object-cover lg:h-auto"
      />

      <div className="absolute top-[50%] -translate-y-1/2 pl-8">
        <h1 className="flex flex-col text-5xl uppercase md:text-7xl">
          <span className="text-white">Membership </span>
          <span className="text-white">With benefits</span>
        </h1>

        <p className="text-white">
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
