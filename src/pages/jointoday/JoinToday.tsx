import { createContext, useMemo, useState } from "react";
import Membership from "./Membership";
import PersonalInformation from "./PersonalInformation";
import Review from "./Review";
import BackgroundImg from "../../assets/images/jointoday-background.jpg";

interface visibilityMemo {
  isVisible: Record<string, boolean>;
  setIsVisible: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const VisibilityContext = createContext<visibilityMemo>({
  isVisible: {
    personalInformation: true,
    membership: false,
    review: true,
  },
  setIsVisible: () => {},
});

function PaymentProcess({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl lg:px-8 lg:py-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="w-full lg:sticky lg:top-6 lg:w-1/2 lg:self-start">
            <div className="relative w-full lg:h-[calc(100vh-3rem)] lg:rounded-lg">
              <div className="relative h-125 w-full sm:h-150 lg:h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${BackgroundImg})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                      Vélo Fitness Discount
                    </h1>
                    <p className="mb-6 max-w-md md:max-w-lg md:text-xl">
                      Join now and receive a complementary suite of services.
                    </p>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <span className="mr-2 md:text-xl">•</span>
                        <span>1 Vélo Assessment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 md:text-xl">•</span>
                        <span>2 Personal Training r 2 Pilate Sessions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="no-scrollbar relative space-y-6 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 lg:px-0 lg:py-0 lg:pl-4">
              <div>
                <div className="flex w-full">
                  <button className="group relative flex-1 px-2 py-4 transition-colors hover:bg-gray-50">
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      01
                    </span>
                    <span className="block font-medium">Select Club</span>
                  </button>

                  <div className="my-2 w-px bg-gray-300"></div>

                  <button className="group relative flex-1 px-2 py-4 transition-colors hover:bg-gray-50">
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      02
                    </span>
                    <span className="block font-medium">Choose Membership</span>
                  </button>

                  <div className="my-2 w-px bg-gray-300"></div>

                  <button className="group relative flex-1 px-2 py-4 transition-colors hover:bg-gray-50">
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      03
                    </span>
                    <span className="block font-medium">Review and Pay</span>
                  </button>
                </div>

                <div className="h-px w-full bg-gray-300"></div>
              </div>
              <div className="h-screen w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JoinToday() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    personalInformation: false,
    membership: true,
    review: false,
  });

  const visibilityMemo = useMemo(
    () => ({ isVisible, setIsVisible }),
    [isVisible],
  );

  return (
    <VisibilityContext.Provider value={visibilityMemo}>
      <PaymentProcess>
        <Membership />
      </PaymentProcess>
    </VisibilityContext.Provider>
  );
}

export { VisibilityContext };
