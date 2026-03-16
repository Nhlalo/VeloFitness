import { useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import WorkOutVideo from "../../assets/videos/class-herobanner.mp4";
import PersonalTraining from "../../assets/images/classes-personalTraining.jpg";
import Training from "../../assets/images/classes-training.jpg";

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

function UnlimitedSignatureClasses() {
  return (
    <Container>
      <div className="m-auto flex max-w-285 flex-col py-18 lg:flex-row">
        <div className="flex-1">
          <h2 className="mt-5 mb-6 text-3xl font-bold uppercase lg:w-[50%] lg:text-4xl">
            Unlimited Signature Classes
          </h2>
          <p className="mb-6 hidden w-[60%] py-3 text-lg leading-[1.4] lg:block">
            Science-backed classes developed by industry minds to maximize
            transformation.
          </p>
          <button className="m-2 hidden rounded-md border-2 border-white bg-transparent px-8 py-4 text-white hover:bg-gray-400 lg:inline">
            BOOK A CLASS
          </button>
        </div>
        <div className="flex-1 overflow-hidden lg:max-w-[43%]">
          <img
            src={Training}
            alt="training"
            loading="lazy"
            className="w-full"
          />
          <p className="mb-6 py-5 lg:hidden">
            Science-backed classes developed by industry minds to maximize
            transformation.
          </p>
          <button className="m-2 rounded-md border-2 border-white bg-transparent px-5 py-3 text-white hover:bg-gray-400 lg:hidden">
            BOOK A CLASS
          </button>
        </div>
      </div>
    </Container>
  );
}
function ExpertInstructors() {
  return (
    <Container>
      <div className="m-auto flex max-w-285 flex-col py-18 lg:flex-row">
        <div className="flex-1">
          <h2 className="mt-5 mb-6 text-3xl font-bold uppercase lg:w-[50%] lg:text-4xl">
            Expert Instructors
          </h2>
          <p className="mb-6 hidden w-[60%] py-3 text-lg leading-[1.4] lg:block">
            Renowned Instructors build community and ignite Members to push past
            their limits
          </p>
          <button className="m-2 hidden rounded-md border-2 border-white bg-transparent px-8 py-4 text-white hover:bg-gray-400 lg:inline">
            BOOK A CLASS
          </button>
        </div>
        <div className="flex-1 overflow-hidden lg:max-w-[43%]">
          <img
            src={PersonalTraining}
            alt="training"
            loading="lazy"
            className="w-full"
          />
          <p className="mb-6 py-5 lg:hidden">
            Science-backed classes developed by industry minds to maximize
            transformation.
          </p>
          <button className="m-2 rounded-md border-2 border-white bg-transparent px-5 py-3 text-white hover:bg-gray-400 lg:hidden">
            Take A CLASS
          </button>
        </div>
      </div>
    </Container>
  );
}

export default function Classes() {
  return (
    <>
      <HeroBanner />
      <main className="bg-black text-white">
        <UnlimitedSignatureClasses />
        <ExpertInstructors />
      </main>
    </>
  );
}
