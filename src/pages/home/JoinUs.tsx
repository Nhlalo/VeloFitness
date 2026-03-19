import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useCarousel from "../../hooks/useCarousel";
import GroupTraining from "../../assets/images/group-training.jpg";
import PersonalTraining from "../../assets/images/personal-training.jpg";
import Club from "../../assets/images/gym-club.jpg";

type Training = {
  heading: string;
  description: string;
  linkName: string;
};

// Navigation mapping - update when routes change
const routes: Record<string, string> = {
  "Discover Classes": "/classes",
  "Discover Personal Training": "/classes",
  "Discover Clubs": "/clubs",
};

export default function JoinUs() {
  const [hoveredItem, setHoveredItem] = useState<string>("Discover Classes");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const { eventHandlers } = useCarousel(containerRef, descriptionRef);

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
  const handleOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const linkName = e.currentTarget.dataset.linkName;
    if (linkName) setHoveredItem(linkName);
  };

  function imgClass(option: string): string {
    return `min-h-105 w-full w-object-cover  ${hoveredItem === option ? "opacity-100 z-2" : "opacity-0 z-1"}`;
  }

  return (
    <section>
      <h2 className="mb-4 text-center text-3xl font-semibold md:text-4xl">
        WHY JOIN US?
      </h2>
      <p className="m-auto max-w-[75ch] pt-1 pb-8 text-center text-white">
        Our community brings together professionals from diverse backgrounds,
        fostering a collaborative environment where ideas flourish. You'll find
        mentorship, build valuable connections, and grow alongside motivated
        peers who share your ambition.
      </p>
      <div className="relative">
        {/* Image is relative, while others are absoulte, as it will determine the size of div to avoid constant reflow */}
        <img
          src={GroupTraining}
          alt="Group training inside a gym"
          className={`${imgClass("Discover Classes")} static`}
          aria-hidden="true"
          loading="lazy"
        />
        <img
          src={PersonalTraining}
          alt="Personal training inside a gym"
          className={`${imgClass("Discover Personal Training")} absolute top-0 left-0 h-full`}
          aria-hidden="true"
          loading="lazy"
        />
        <img
          src={Club}
          alt="Gym club"
          className={`${imgClass("Discover Clubs")} absolute top-0 left-0 h-full`}
          aria-hidden="true"
          loading="lazy"
        />
        <div
          ref={containerRef}
          {...eventHandlers}
          className="absolute top-[50%] left-[50%] z-3 flex w-full -translate-x-1/2 -translate-y-1/2 flex-row gap-3 overflow-hidden px-9"
        >
          {gymOfferings.map((content: Training) => {
            // Button visibility:
            // - Mobile: always visible
            // - Desktop: visible only on hover
            const buttonClasses = `font-semibold text-black underline underline-offset-8 transition-opacity duration-200 
  opacity-100 ${hoveredItem === content.linkName ? "lg:opacity-100" : "lg:opacity-0"}`;
            //Div appearance
            // - Mobile: white background with black text
            // - Desktop: transparent background with white text until hovered
            const parentDivClasses = `min-w-[17.5rem] flex-1 bg-white px-6 pt-0 pb-8 text-black 
  ${hoveredItem === content.linkName ? "lg:bg-white lg:text-black" : "lg:bg-transparent lg:text-white"}
  `;
            return (
              <div
                key={content.heading}
                className={parentDivClasses}
                onMouseEnter={handleOnMouseEnter}
                data-link-name={content.linkName}
                ref={descriptionRef}
              >
                <hr
                  aria-hidden="true"
                  className="text-white opacity-0 lg:opacity-100"
                />
                <h3 className="mb-6 pt-8 text-[1.75rem] font-semibold lg:text-3xl">
                  {content.heading}
                </h3>
                <p className="mb-6">{content.description}</p>
                <button
                  type="button"
                  data-link-name={content.linkName}
                  onClick={handleClick}
                  className={buttonClasses}
                >
                  {content.linkName}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
