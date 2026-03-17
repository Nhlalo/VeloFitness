import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Props } from "../../types/classes.interface";
import { HeroBannerProps } from "../../types/herobanner.interface";
import Container from "../../components/shared/Container";
import SubClasses from "../../components/shared/SubClasses";
import HeroBanner from "../../components/shared/HeroBanner";
import WorkOutVideo from "../../assets/videos/class-herobanner.mp4";
import PersonalTraining from "../../assets/images/classes-personalTraining.jpg";
import Training from "../../assets/images/classes-training.jpg";
import BikeRiding from "../../assets/images/classes-bikeriding.jpg";
import Yoga from "../../assets/images/classes-yoga.jpg";

const classesDescription: Props[] = [
  {
    heading: "Unlimited Signature Classes",
    description:
      "Science-backed classes developed by industry minds to maximize transformation.",
    imageSource: Training,
  },
  {
    heading: " Expert Instructors",
    description:
      "  Renowned Instructors build community and ignite Members to push past their limits",
    imageSource: PersonalTraining,
  },
];

const herobannerProps: HeroBannerProps = {
  videoSource: WorkOutVideo,
  heading1: "DESIGN FOR THE INDIVIDUAL.",
  heading2: "POWERED BY THE COLLECTIVE.",
  buttonText: "BOOK A CLASS",
};

const exclusivesDescription: { imageSrc: string; alt: string }[] = [
  { imageSrc: BikeRiding, alt: "Person riding a bike" },
  { imageSrc: Yoga, alt: "Two people practicing yoga" },
  { imageSrc: Yoga, alt: "A person stretching " },
];

function Exlusives() {
  const [isPreviousScrollable, setPreviousScrollable] =
    useState<boolean>(false);
  const [isNextScrollable, setNextScrollable] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);

  function updateButtonStates() {
    const scrollLeft = containerRef.current!.scrollLeft;
    const maxScroll =
      (containerRef.current?.scrollWidth ?? 0) -
      (containerRef.current?.clientWidth ?? 0);

    const isAtStart = scrollLeft <= 0;
    const isAtEnd = Math.abs(scrollLeft - maxScroll) < 1;
    console.log(isAtStart);
    console.log(isAtEnd);
    // Can scroll previous if NOT at start

    setPreviousScrollable(!isAtStart);

    // Can scroll next if NOT at end
    setNextScrollable(!isAtEnd);
  }

  function handlePrevious() {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: -imgContainerRef.current!.clientWidth,
      behavior: "smooth",
    });

    updateButtonStates();
  }

  function handleNext() {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: imgContainerRef.current?.clientWidth,
      behavior: "smooth",
    });

    //Smooth scroll animation takes time, without a slight delay the leftScroll value will still be zero, making previous slide button still disabled.
    setTimeout(() => {
      updateButtonStates();
    }, 20);
  }

  return (
    <Container>
      <div className="relative mx-3 mt-8 mb-8 flex flex-col lg:flex-row">
        <h2 className="pb-6 text-3xl font-semibold uppercase lg:w-[25%] lg:px-6 lg:text-[2.625rem]">
          New Vélo Exclusives
        </h2>
        <div
          className="no-scrollbar mb-25 flex snap-x snap-mandatory overflow-x-auto"
          ref={containerRef}
        >
          {exclusivesDescription.map((content) => {
            return (
              <div
                className="aspect-square w-[80%] shrink-0 snap-start px-3 md:w-[65%] lg:w-118"
                key={content.alt}
                ref={imgContainerRef}
              >
                <img
                  src={content.imageSrc}
                  alt={content.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="absolute right-[17%] bottom-[12%] hidden gap-4 lg:flex">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center bg-white text-black"
            aria-label="View previous slide w-10 h-10"
            ref={leftButtonRef}
            disabled={!isPreviousScrollable}
            onClick={handlePrevious}
          >
            <ArrowLeft aria-hidden />
          </button>
          <button
            type="button"
            aria-label="View next slide "
            className="flex h-10 w-10 items-center justify-center bg-white text-black"
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
        <Exlusives />
        {classesDescription.map((content) => {
          return (
            <SubClasses
              heading={content.heading}
              description={content.description}
              imageSource={content.imageSource}
              key={content.heading}
            />
          );
        })}
      </main>
    </>
  );
}
