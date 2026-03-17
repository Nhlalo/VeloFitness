import { useRef } from "react";
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
  // const containerRef = useRef<HTMLDivElement | null>(null)
  // const containerRef = useRef<HTMLDivElement | null>(null)
  // const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <Container>
      <div className="mx-3 mt-8 mb-8 flex flex-col lg:flex-row">
        <h2 className="pb-6 text-3xl font-semibold uppercase lg:w-[25%] lg:px-6 lg:text-[2.625rem]">
          New Vélo Exclusives
        </h2>
        <div className="no-scrollbar mb-25 flex overflow-x-auto">
          {exclusivesDescription.map((content) => {
            return (
              <div
                className="aspect-square w-[80%] shrink-0 px-3 md:w-[65%] lg:w-118"
                key={content.alt}
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
        <div>
          <button type="button">
            <ArrowLeft aria-hidden />
          </button>
          <button type="button">
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
            />
          );
        })}
      </main>
    </>
  );
}
