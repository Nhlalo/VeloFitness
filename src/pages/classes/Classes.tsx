import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useCarousel from "../../hooks/useCarousel";
import useActiveIndexFullVisible from "../../hooks/useActiveIndexFullyVisible";
import { Props } from "../../types/classes.interface";
import { HeroBannerProps } from "../../types/herobanner.interface";
import Container from "../../components/shared/Container";
import SubClasses from "../../components/shared/SubClasses";
import HeroBanner from "../../components/shared/HeroBanner";
import WorkOutVideo from "../../assets/videos/class-herobanner.mp4";
import Img from "../../components/shared/Img";

interface ExclusiveDescription {
  heading: string;
  description: string;
  imageSrc: string;
  alt: string;
}

const classesDescription: Props[] = [
  {
    heading: "Unlimited Signature Classes",
    description:
      "Science-backed classes developed by industry minds to maximize transformation.",
    imageSource: "/classes-training.jpg",
    path: "/profile",
  },
  {
    heading: " Expert Instructors",
    description:
      "  Renowned Instructors build community and ignite Members to push past their limits",
    imageSource: "/classes-personalTraining.jpg",
    path: "/profile",
  },
];

const herobannerProps: HeroBannerProps = {
  videoSource: WorkOutVideo,
  heading1: "DESIGN FOR THE INDIVIDUAL.",
  heading2: "POWERED BY THE COLLECTIVE.",
  buttonText: "BOOK A CLASS",
};

const exclusivesDescription: ExclusiveDescription[] = [
  {
    heading: "PRECISION RIDE ™",
    description:
      "A performance-based cycling experience exclusive to Equinox. This class uses precision metrics to monitor your power and quantify your progress over time. Build endurance, increase aerobic capacity, and discover your reason to ride.",
    imageSrc: "/classes-bikeriding.jpg",
    alt: "Person riding a bike",
  },
  {
    heading: "SCULPTED YOGA™",
    description:
      "Take Vinyasa up a notch with a challenging class that combines yoga with lightweight sculpting. Incorporating Bala Bangles and hand weights, this class merges Vinyasa flow with low-impact toning exercises to enhance strength, mobility, and balance.",
    imageSrc: "/classes-yoga.jpg",
    alt: "Two people practicing yoga",
  },
  {
    heading: "PILATES RISE",
    description:
      "Evolve your Pilates practice with our contemporary approach that sculpts your core, glutes, and full body. Start with classical Pilates movements, then intensify, build, and burn for a transformative Pilates experience.",
    imageSrc: "/classes-yoga.jpg",
    alt: "A person stretching ",
  },
];

function Exclusives() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  // Create refs array for images
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  //This returns the event handler function
  const {
    isPreviousScrollable,
    isNextScrollable,
    isDragging,
    eventHandlers,
    handlePrevious,
    handleNext,
  } = useCarousel(containerRef, imgContainerRef);

  //This returns an element or elements that are fully visible within a specific container
  const activeIndex = useActiveIndexFullVisible(containerRef, itemRefs);

  return (
    <Container>
      <div className="relative mx-3 mt-8 flex flex-col gap-4 lg:flex-row">
        <h2 className="mr-6 shrink-0 pb-6 text-3xl font-semibold uppercase lg:w-[25%] lg:px-6 lg:text-[2.625rem]">
          New Vélo Exclusives
        </h2>
        <div
          className={`no-scrollbar mb-25 flex cursor-grab overflow-x-auto select-none active:cursor-grabbing ${isDragging ? "scroll-auto" : "scroll-smooth"}`}
          ref={containerRef}
          {...eventHandlers}
        >
          {exclusivesDescription.map((content, index) => {
            return (
              <div
                className="relative flex w-[80%] shrink-0 flex-col px-3 md:w-[65%] lg:block lg:w-[35vw]"
                key={content.alt}
              >
                <div
                  className="relative aspect-square w-full"
                  ref={imgContainerRef}
                >
                  <Img
                    src={content.imageSrc}
                    alt={content.alt}
                    className={`${activeIndex == index ? "lg:scale-100" : "lg:scale-75"} h-full w-full object-cover`}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    index={index}
                    loading="eager"
                  />

                  {/* Desktop view*/}
                  <div
                    className={`${activeIndex == index ? "lg:scale-x-105 lg:opacity-100" : "lg:scale-x-50 lg:opacity-0"} bottom-0 hidden bg-white p-3 transition-all duration-300 ease-in-out lg:absolute lg:block`}
                  >
                    <h3 className="text-[1.75rem] font-semibold text-black lg:text-3xl">
                      {content.heading}
                    </h3>
                    <p className="text-gray-800 lg:text-lg">
                      {content.description}
                    </p>
                  </div>
                </div>

                {/* Mobile/Tablet view*/}
                <div className="flex flex-1 lg:hidden">
                  <div className="flex w-full flex-col bg-white p-3">
                    <h3 className="text-[1.75rem] font-semibold text-black">
                      {content.heading}
                    </h3>
                    <p className="flex-1 text-gray-800">
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute right-[17%] bottom-22 hidden gap-4 lg:flex">
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center bg-white opacity-0 lg:opacity-100 ${!isPreviousScrollable ? "scale-80 text-gray-500" : "scale-100 text-black"}`}
            aria-label="View previous slide"
            ref={leftButtonRef}
            disabled={!isPreviousScrollable}
            onClick={handlePrevious}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="View next slide "
            className={`flex h-10 w-10 items-center justify-center bg-white opacity-0 lg:opacity-100 ${!isNextScrollable ? "scale-80 text-gray-500" : "scale-100 text-black"}`}
            ref={rightButtonRef}
            disabled={!isNextScrollable}
            onClick={handleNext}
          >
            <ArrowRight aria-hidden />
          </button>
        </div>
      </div>
    </Container>
  );
}

export default function Classes() {
  return (
    <>
      <HeroBanner
        videoSource={herobannerProps.videoSource}
        heading1={herobannerProps.heading1}
        heading2={herobannerProps.heading2}
        buttonText={herobannerProps.buttonText}
      />
      <main className="bg-black text-white">
        <Exclusives />
        {classesDescription.map((content) => {
          return (
            <SubClasses
              heading={content.heading}
              description={content.description}
              imageSource={content.imageSource}
              key={content.heading}
              path={content.path}
            />
          );
        })}
      </main>
    </>
  );
}
