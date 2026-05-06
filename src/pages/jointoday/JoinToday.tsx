import {
  createContext,
  useMemo,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import Membership from "./Membership";
import PersonalInformation from "./PersonalInformation";
import Review from "./Review";
import BackgroundImg from "../../assets/images/jointoday-background.jpg";

interface visibilityMemo {
  isVisible: Record<string, boolean>;
  setIsVisible: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  selectedMembership: any;
  setSelectedMembership: React.Dispatch<React.SetStateAction<any>>;
}

const VisibilityContext = createContext<visibilityMemo>({
  isVisible: {
    personalInformation: true,
    membership: false,
    review: false,
  },
  setIsVisible: () => {},
  formData: {},
  setFormData: () => {},
  selectedMembership: null,
  setSelectedMembership: () => {},
});

function PaymentProcess({ children }: { children: React.ReactNode }) {
  const { isVisible } = useContext(VisibilityContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [isVisible]);

  const handleBackClick = () => {
    setShowLeaveModal(true);
  };

  const handleStay = () => {
    setShowLeaveModal(false);
  };

  const handleLeave = () => {
    setShowLeaveModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="w-full bg-white">
        <button
          onClick={handleBackClick}
          className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-black lg:top-6 lg:right-6 lg:text-black lg:hover:bg-gray-100"
          aria-label="Go back"
        >
          <X
            aria-hidden="true"
            size={20}
            className="text-black sm:text-white lg:text-black"
          />
        </button>

        <div className="mx-auto lg:px-8 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Left Column - Image - Stays at 50% width on all screen sizes */}
            <div className="w-full lg:sticky lg:top-6 lg:w-1/2 lg:self-start">
              <div className="relative w-full lg:h-[calc(100vh-3rem)] lg:rounded-lg">
                <div className="relative h-screen w-full lg:h-[95vh]">
                  <img
                    src={BackgroundImg}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                      <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        Vélo Fitness Discount
                      </h1>
                      <p className="mb-6 max-w-md text-sm sm:text-base md:max-w-lg md:text-lg lg:text-xl xl:text-2xl">
                        Join now and receive a complementary suite of services.
                      </p>
                      <ul className="space-y-2 text-left text-sm sm:text-base">
                        <li className="flex items-start">
                          <span className="mr-2 text-base sm:text-xl">•</span>
                          <span>1 Vélo Assessment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-base sm:text-xl">•</span>
                          <span>2 Personal Training or 2 Pilates Sessions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div
                ref={containerRef}
                className="space-y-6 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 md:px-8 lg:px-0 lg:py-0 lg:pl-4 xl:pl-6"
                style={{ maxHeight: "calc(100vh - 2rem)" }}
              >
                <div className="lg:sticky lg:top-0 lg:z-10 lg:bg-white">
                  <div className="flex w-full">
                    <div className="group relative flex-1 px-2 py-4 sm:px-4">
                      <span className="absolute top-1 left-1 text-xs text-gray-400 sm:left-2">
                        01
                      </span>
                      <span className="block text-center text-sm font-medium text-black sm:text-base">
                        Personal Info
                      </span>
                    </div>

                    <div className="my-2 w-px bg-gray-300" />

                    <div className="group relative flex-1 px-2 py-4 sm:px-4">
                      <span className="absolute top-1 left-1 text-xs text-gray-400 sm:left-2">
                        02
                      </span>
                      <span
                        className={`block text-center text-sm font-medium sm:text-base ${
                          isVisible.membership || isVisible.review
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        Choose Membership
                      </span>
                    </div>

                    <div className="my-2 w-px bg-gray-300" />

                    <div className="group relative flex-1 px-2 py-4 sm:px-4">
                      <span className="absolute top-1 left-1 text-xs text-gray-400 sm:left-2">
                        03
                      </span>
                      <span
                        className={`block text-center text-sm font-medium sm:text-base ${
                          isVisible.review ? "text-black" : "text-gray-400"
                        }`}
                      >
                        Review and Pay
                      </span>
                    </div>
                  </div>
                  <div className="h-px w-full bg-gray-300" />
                </div>

                <div className="relative min-h-screen pb-8 lg:pb-12">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLeaveModal && (
        <>
          {/* Overlay */}
          <div
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleStay}
          />

          <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
              <h2 className="mb-6 text-2xl font-bold text-black">
                Are You Sure You Want To Leave?
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleStay}
                  className="flex-1 rounded-lg bg-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Stay
                </button>

                <button
                  onClick={handleLeave}
                  className="flex-1 rounded-lg border-2 border-black bg-white px-6 py-3 text-base font-semibold text-black transition-colors hover:bg-gray-100"
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function JoinToday() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    personalInformation: true,
    membership: false,
    review: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    zipCode: "",
    phoneNumber: "",
    clubName: null as string | null,
  });

  const [selectedMembership, setSelectedMembership] = useState<any>(null);

  const contextValue = useMemo(
    () => ({
      isVisible,
      setIsVisible,
      formData,
      setFormData,
      selectedMembership,
      setSelectedMembership,
    }),
    [isVisible, formData, selectedMembership],
  );

  return (
    <VisibilityContext.Provider value={contextValue}>
      <PaymentProcess>
        <PersonalInformation />
        <Membership />
        <Review />
      </PaymentProcess>
    </VisibilityContext.Provider>
  );
}

export { VisibilityContext };
