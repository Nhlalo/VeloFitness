import { Props } from "../../types/classes.interface";
import Container from "../../components/shared/Container";
import SubClasses from "../../components/shared/SubClasses";
import HeroBanner from "../../assets/images/membership-herobanner.jpg";
import PilatesImg from "../../assets/images/membership-pilate.jpg";
import UpcloseImg from "../../assets/images/membership-upclose.jpg";
import ClassesImg from "../../assets/images/membership-class.jpg";

const classesDescription: Props[] = [
  {
    heading: "Unlimited Signature Classes",
    description:
      "Science-backed classes developed by the industry's best minds to maximize transformation.",
    imageSource: ClassesImg,
  },
  {
    heading: "Expert Coaching ",
    description:
      "One-on-One training at Vélo is backed by our Health Advisory Board, and the Vél OS. This proprietary operating system, built to advance full health optimization, decodes and unlocks the peak of your potential, redefining High-Performance Living on a whole new scale. This is more than training, it’s the first-of-its-kind, data-driven and expert led path to unlocking your absolute best and achieving extraordinary results.",
    imageSource: UpcloseImg,
  },
  {
    heading: "Pilates Evolved",
    description:
      "Improve your strength, mobility, and flexibility with guidance in our studios or at home. Our certified Pilates instructors with over 400 hours of experience will help you tighten what’s loose and loosen what’s tight with touchless adjustments.",
    imageSource: PilatesImg,
  },
];

const newMemberBenefits: string[] = [
  " Complimentary Equifit Assessment",
  "Complimentary Personal Training session",
  " Complimentary Studio Pilates session ",
  "25% off your first session at The Spa at Vélo",
  "2 annual guest passes",
  "Referral rewards when your friends join Vélo",
];
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

function NewMembership() {
  return (
    <Container>
      <h2>New members benefits when you join</h2>
      <div>
        <h3>Join Vélo today to unlock exclusive member benefits:</h3>
        <ul>
          {newMemberBenefits.map((content) => {
            return <li key={content}>{content}</li>;
          })}
        </ul>
      </div>
    </Container>
  );
}

export default function Membership() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <NewMembership />
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
