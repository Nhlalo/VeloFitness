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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);

  // Touch and drag state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartScrollLeft = useRef<number>(0);
  const isMouseDown = useRef<boolean>(false);

  function updateButtonStates() {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;

    const isAtStart = scrollLeft <= 0;
    const isAtEnd = Math.abs(scrollLeft - maxScroll) < 1;

    setPreviousScrollable(!isAtStart);
    setNextScrollable(!isAtEnd);
  }

  function handlePrevious() {
    if (!containerRef.current || !imgContainerRef.current) return;

    containerRef.current.scrollBy({
      left: -imgContainerRef.current.clientWidth,
      behavior: "smooth",
    });

    // Update after scroll animation
    setTimeout(updateButtonStates, 200);
  }

  function handleNext() {
    if (!containerRef.current || !imgContainerRef.current) return;

    containerRef.current.scrollBy({
      left: imgContainerRef.current.clientWidth,
      behavior: "smooth",
    });

    setTimeout(updateButtonStates, 200);
  }

  // TOUCH EVENTS (Mobile)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartScrollLeft.current = containerRef.current.scrollLeft;

    // Disable smooth scrolling during drag for better performance
    containerRef.current.style.scrollBehavior = "auto";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const touchX = e.touches[0].clientX;
    const deltaX = dragStartX.current - touchX;

    // Manual scroll while dragging
    containerRef.current.scrollLeft = dragStartScrollLeft.current + deltaX;

    // Prevent page scroll when dragging horizontally
    if (Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || !containerRef.current) return;

    setIsDragging(false);
    containerRef.current.style.scrollBehavior = "smooth";

    // Update button states after touch
    updateButtonStates();
  };

  // MOUSE DRAG (Desktop)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    isMouseDown.current = true;
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = containerRef.current.scrollLeft;

    // Disable smooth scrolling during drag
    containerRef.current.style.scrollBehavior = "auto";
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";

    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current || !containerRef.current) return;

    e.preventDefault();
    const deltaX = dragStartX.current - e.clientX;
    containerRef.current.scrollLeft = dragStartScrollLeft.current + deltaX;
  };

  const handleMouseUp = () => {
    if (!isMouseDown.current || !containerRef.current) return;

    isMouseDown.current = false;
    containerRef.current.style.scrollBehavior = "smooth";
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";

    updateButtonStates();
  };

  const handleMouseLeave = () => {
    if (isMouseDown.current && containerRef.current) {
      isMouseDown.current = false;
      containerRef.current.style.scrollBehavior = "smooth";
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.userSelect = "auto";

      updateButtonStates();
    }
  };

  // KEYBOARD NAVIGATION
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imgContainerRef.current) return;

    switch (e.key) {
      case "ArrowLeft":
        handlePrevious();
        e.preventDefault();
        break;
      case "ArrowRight":
        handleNext();
        e.preventDefault();
        break;
      case "Home":
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        setTimeout(updateButtonStates, 200);
        e.preventDefault();
        break;
      case "End":
        containerRef.current.scrollTo({
          left:
            containerRef.current.scrollWidth - containerRef.current.clientWidth,
          behavior: "smooth",
        });
        setTimeout(updateButtonStates, 200);
        e.preventDefault();
        break;
    }
  };

  // SCROLL EVENT FOR BUTTON UPDATES
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateButtonStates);

    // Initial check
    updateButtonStates();

    return () => {
      container.removeEventListener("scroll", updateButtonStates);
    };
  }, []);

  return (
    <Container>
      <div className="relative mx-3 mt-8 mb-8 flex flex-col lg:flex-row">
        <h2 className="pb-6 text-3xl font-semibold uppercase lg:w-[25%] lg:px-6 lg:text-[2.625rem]">
          New Vélo Exclusives
        </h2>
        <div
          className="no-scrollbar mb-25 flex overflow-x-auto"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
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
