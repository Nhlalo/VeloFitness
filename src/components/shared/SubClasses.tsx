import Container from "./Container";
import { Props } from "../../types/classes.interface";

export default function SubClasses({
  heading,
  description,
  imageSource,
}: Props) {
  return (
    <Container>
      <div className="m-auto flex flex-col py-18 lg:flex-row">
        <div>
          <h2 className="mt-5 mb-6 text-3xl font-bold uppercase lg:text-4xl">
            {heading}
          </h2>
          <p className="mb-6 hidden w-[60%] py-3 text-lg leading-[1.4] lg:block">
            {description}
          </p>
          <button className="m-2 hidden rounded-md border-2 border-white bg-transparent px-8 py-4 text-white hover:bg-gray-400 lg:inline">
            BOOK A CLASS
          </button>
        </div>
        <div className="flex-1 overflow-hidden lg:max-w-[80%]">
          <img
            src={imageSource}
            alt="training"
            loading="lazy"
            className="w-full"
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
