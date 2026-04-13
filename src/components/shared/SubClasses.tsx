import useNavigateBasedOnLogin from "../../hooks/useNavigateBasedOnLogIn";
import Container from "./Container";
import { Props } from "../../types/classes.interface";

export default function SubClasses({
  heading,
  description,
  imageSource,
  path,
}: Props) {
  const { handleClick } = useNavigateBasedOnLogin(path);

  return (
    <Container>
      <div className="m-auto flex flex-col py-18 lg:flex-row lg:gap-8">
        {/* Add w-full and lg:w-1/2 to both divs */}
        <div className="w-full lg:w-1/2">
          <h2 className="mt-5 mb-6 text-3xl font-bold uppercase lg:text-4xl">
            {heading}
          </h2>
          <p className="mb-6 hidden w-full py-3 text-lg leading-[1.4] lg:block lg:w-[90%]">
            {description}
          </p>
          <button
            onClick={handleClick}
            className="m-2 hidden rounded-md border-2 border-white bg-transparent px-8 py-4 text-white hover:bg-gray-400 lg:inline-block"
          >
            BOOK A CLASS
          </button>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            src={imageSource}
            alt="training"
            loading="lazy"
            className="h-auto w-full"
          />
          <p className="mb-6 py-5 lg:hidden">{description}</p>
          <button className="m-2 rounded-md border-2 border-white bg-transparent px-5 py-3 text-white hover:bg-gray-400 lg:hidden">
            BOOK A CLASS
          </button>
        </div>
      </div>
    </Container>
  );
}
