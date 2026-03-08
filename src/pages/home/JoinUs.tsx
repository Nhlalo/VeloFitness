import { useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import PeopleTraining from "../../assets/images/people-training.jpg";

type Training = {
  heading: string;
  description: string;
  linkName: string;
};

const routes: Record<string, string> = {
  "Discover Classes": "/classes",
  "Discover Personal Training": "/classes",
  "Discover Clubs": "/clubs",
};

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

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    const linkName = e.currentTarget.dataset.linkName;
    const route = linkName ? routes[linkName] : null;
    if (route) navigate(route);
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
        <div className="mt-16 lg:relative">
          <img
            src={PeopleTraining}
            alt="Person training inside a gym"
            className="rounded-xl object-cover md:aspect-2/1"
          />
        </div>
        <div className="flex flex-col gap-3 px-9 lg:absolute lg:bottom-0 lg:flex-row">
          {gymOfferings.map((content: Training) => {
            return (
              <div
                key={content.heading}
                className="flex-1 bg-white px-6 pt-0 pb-8 text-black lg:bg-transparent lg:text-white lg:hover:bg-white lg:hover:text-black"
              >
                <hr
                  aria-hidden="true"
                  className="text-white opacity-0 lg:opacity-100"
                />
                <h3 className="mb-6 pt-8 text-3xl font-semibold">
                  {content.heading}
                </h3>
                <p className="mb-6">{content.description}</p>
                <button
                  type="button"
                  data-link-name={content.linkName}
                  onClick={handleClick}
                  className="font-semibold text-black underline underline-offset-8"
                >
                  {content.linkName}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
