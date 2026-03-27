import {
  useState,
  useRef,
  useCallback,
  useContext,
  createContext,
  useMemo,
} from "react";
import { VisibilityContext } from "./JoinToday";
import validateField from "../../utils/validateInputs";
import ClubOptions from "./ClubOptions";

interface userClubMemo {
  userClub: string | null;
  setUserClub: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChosenClubContext = createContext<userClubMemo>({
  userClub: null,
  setUserClub: () => {},
});

function UserInformation() {
  const { userClub } = useContext(ChosenClubContext);
  const { isVisible, setIsVisible } = useContext(VisibilityContext);

  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    zipCode: false,
    phoneNumber: false,
  });

  //Determines the visibility of the ClubOptions component
  const [isSelectClub, setIsSelectClub] = useState<boolean>(false);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({
    name: null,
    surname: null,
    email: null,
    zipCode: null,
    phoneNumber: null,
  });

  const areInputsValid = useCallback(() => {
    //If isSelectClub is true, child component(ClubOptions) is displayed on screen, do not execute the conditional code
    if (!isSelectClub) {
      for (const key in formErrors) {
        if (
          formErrors[key as keyof typeof formErrors] === true ||
          !inputRefs.current[key as keyof typeof inputRefs.current]?.value
            .length
        ) {
          return false;
        }
      }
      if (!userClub) return false;
      return true;
    }

    return false;
  }, [formErrors, userClub]);

  const setRef = (key: string) => (el: HTMLInputElement | null) => {
    inputRefs.current[key] = el;
  };

  function handleClick() {
    setIsSelectClub(true);
  }

  function handleShowNextFormSection() {
    setIsVisible({
      personalInformation: false,
      membershipVisible: true,
      reviewV: false,
    });
  }

  function handleClose() {
    setIsSelectClub(false);
  }

  return (
    <>
      <div
        className={`w-full space-y-6 sm:space-y-8 ${isVisible.personalInformation ? "block" : "hidden"}`}
      >
        <div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
              3 Steps you are in
            </h2>

            <form className="mt-4 space-y-3 sm:mt-6 sm:space-y-4" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Name"
                    pattern="[A-Za-z\s\-']+"
                    title="Only letters, spaces, hyphens, and apostrophes allowed"
                    minLength={2}
                    maxLength={50}
                    required
                    onChange={(e) =>
                      validateField(
                        setFormErrors,
                        "name",
                        e.target.value,
                        "[A-Za-z\\s\\-']+",
                      )
                    }
                    ref={setRef("name")}
                    className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                      formErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {formErrors.name && (
                    <div className="mt-1 text-xs text-red-500">
                      Please enter a valid name (letters, spaces, hyphens,
                      apostrophes only)
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Surname"
                    pattern="[A-Za-z\s\-']+"
                    title="Only letters, spaces, hyphens, and apostrophes allowed"
                    minLength={2}
                    maxLength={50}
                    required
                    onChange={(e) =>
                      validateField(
                        setFormErrors,
                        "surname",
                        e.target.value,
                        "[A-Za-z\\s\\-']+",
                      )
                    }
                    ref={setRef("surname")}
                    className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                      formErrors.surname
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {formErrors.surname && (
                    <div className="mt-1 text-xs text-red-500">
                      Please enter a valid surname (letters, spaces, hyphens,
                      apostrophes only)
                    </div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                  maxLength={254}
                  required
                  onChange={(e) =>
                    validateField(
                      setFormErrors,
                      "email",
                      e.target.value,
                      "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
                    )
                  }
                  ref={setRef("email")}
                  className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                    formErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {formErrors.email && (
                  <div className="mt-1 text-xs text-red-500">
                    Please enter a valid email address
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Zip or Postal Code"
                  pattern="^[A-Za-z0-9\s\-]{3,12}$"
                  maxLength={12}
                  minLength={3}
                  required
                  onChange={(e) =>
                    validateField(
                      setFormErrors,
                      "zipCode",
                      e.target.value,
                      "^[A-Za-z0-9\\s\\-]{3,12}$",
                    )
                  }
                  ref={setRef("zipCode")}
                  className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                    formErrors.zipCode
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {formErrors.zipCode && (
                  <div className="mt-1 text-xs text-red-500">
                    Please enter a valid zip code (3-12 characters, letters,
                    numbers, spaces, hyphens)
                  </div>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="+1 (234) 567-8900"
                  pattern="^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$"
                  minLength={7}
                  maxLength={20}
                  required
                  onChange={(e) =>
                    validateField(
                      setFormErrors,
                      "phoneNumber",
                      e.target.value,
                      "^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$",
                    )
                  }
                  ref={setRef("phoneNumber")}
                  className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                    formErrors.phoneNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {formErrors.phoneNumber && (
                  <div className="mt-1 text-xs text-red-500">
                    Please enter a valid phone number
                  </div>
                )}
              </div>

              <button
                onClick={handleClick}
                type="button"
                className="w-full rounded-md border-2 border-black bg-white px-4 py-3 text-center text-sm font-bold transition-colors duration-300 hover:bg-black hover:text-white sm:px-6 sm:py-4 sm:text-base"
              >
                Select a club +
              </button>
            </form>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              <p className="text-xs leading-relaxed text-gray-500 sm:text-xs">
                By clicking Join Today, I agree to the Vélo{" "}
                <span className="cursor-pointer text-black underline">
                  Terms & Conditions
                </span>
                ,{" "}
                <span className="cursor-pointer text-black underline">
                  Privacy Policy
                </span>{" "}
                and that Vélo brand companies and their membership advisors can
                contact me regarding promotions, marketing, products, services,
                and other information that may interest me. This site is
                protected by reCAPTCHA and the Google{" "}
                <span className="cursor-pointer text-black underline">
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="cursor-pointer text-black underline">
                  Terms of Service
                </span>{" "}
                apply.
              </p>

              <button
                type="button"
                disabled={areInputsValid() ? false : true}
                onClick={handleShowNextFormSection}
                className={`w-full rounded-md px-4 py-3 text-center text-sm font-medium text-black transition-colors duration-300 sm:px-6 sm:py-4 sm:text-base ${areInputsValid() ? `rounded-md border-2 border-black bg-white hover:bg-black hover:text-white` : `bg-gray-200 hover:bg-gray-300`}`}
              >
                Join Today
              </button>

              <p className="text-center text-xs text-gray-400">
                By continuing, I agree to share my contact information with a
                Membership advisor
              </p>
            </div>
          </div>
        </div>
      </div>
      <ClubOptions onClose={handleClose} isDisplay={isSelectClub} />
    </>
  );
}

export default function PersonalInformation() {
  const [userClub, setUserClub] = useState<string | null>(null);

  const userClubMemo = useMemo(() => ({ userClub, setUserClub }), [userClub]);
  return (
    <ChosenClubContext.Provider value={userClubMemo}>
      <UserInformation />
    </ChosenClubContext.Provider>
  );
}

export { ChosenClubContext };
