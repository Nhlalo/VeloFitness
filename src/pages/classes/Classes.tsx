import { Props } from "../../types/classes.interface";
import { HeroBannerProps } from "../../types/herobanner.interface";
import Container from "../../components/shared/Container";
import SubClasses from "../../components/shared/SubClasses";
import HeroBanner from "../../components/shared/HeroBanner";
import WorkOutVideo from "../../assets/videos/class-herobanner.mp4";
import PersonalTraining from "../../assets/images/classes-personalTraining.jpg";
import Training from "../../assets/images/classes-training.jpg";

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
