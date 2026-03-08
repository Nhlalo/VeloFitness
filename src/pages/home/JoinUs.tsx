import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import PeopleTraining from "../../assets/images/people-training.jpg";

type Training = {
  heading: string;
  description: string;
  linkName: string;
};

const joinUsKeys: string[] = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];

export default function JoinUs() {
  const navigate = useNavigate();

  const gymOfferings: Training[] = [
    {
      heading: "Signature Classes",
      description:
        " New and Unlimited classes exclusive to Velo. Designed for the individual. Powered by the collective.",
      linkName: "Discover Classes",
    },
    {
      heading: "Personal Training",
      description:
        "Precision-backed 1:1 Personal Training with EFTI-certified COACHES, dedicated to maximizing your potential.",
      linkName: "Discover Personal Training",
    },
    {
      heading: "Clubs",
      description:
        "State-of-the-art training environments equipped with premium functional and strength equipment. Access to EFTI-certified coach oversight and structured training zones.",
      linkName: "Discover Clubs",
    },
  ];

  const handleClick = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevents the "to" navigation
    const linkName: string | undefined = e.currentTarget.dataset.linkName;
    if (linkName === "Discover Classes") {
      navigate("/classes");
    } else if (linkName === "Discover Personal Training") {
      navigate("/classes");
    }
    if (linkName === "Discover Clubs") {
      navigate("/clubs");
    }
  };
  return (
    <Container>
      <div>
        <h2 className="mb-4 text-center text-4xl font-semibold">
          WHY JOIN US?
        </h2>
        <p className="m-auto max-w-[75ch] text-gray-800">
          Our community brings together professionals from diverse backgrounds,
          fostering a collaborative environment where ideas flourish. You'll
          find mentorship, build valuable connections, and grow alongside
          motivated peers who share your ambition.
        </p>
        <div className="mt-16">
          <img
            src={PeopleTraining}
            alt="Person training inside a gym"
            className="rounded-xl object-cover md:aspect-2/1"
          />
        </div>
        <div>
          {gymOfferings.map((content: Training, index: number) => {
            return (
              <div key={joinUsKeys[index]}>
                <hr aria-hidden="true" />
                <h3>{content.heading}</h3>
                <p>{content.description}</p>
                <Link
                  to="/"
                  data-link-name={content.linkName}
                  onClick={handleClick}
                >
                  {content.linkName}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
