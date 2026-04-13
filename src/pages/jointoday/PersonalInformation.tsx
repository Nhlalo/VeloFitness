import { useState, useContext } from "react";
import { VisibilityContext } from "./JoinToday";
import { formFields } from "../../data/constants/inputsvalidation";
import validateField from "../../utils/validateInputs";
import ClubOptions from "./ClubOptions";

interface FormErrors {
  name: boolean;
  surname: boolean;
  email: boolean;
  zipCode: boolean;
  phoneNumber: boolean;
}

export default function PersonalInformation() {
  const { isVisible, setIsVisible, formData, setFormData } =
    useContext(VisibilityContext);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    surname: false,
    email: false,
    zipCode: false,
    phoneNumber: false,
  });
  const [isSelectClub, setIsSelectClub] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    jsPattern: string,
  ) => {
    const value = e.target.value;

    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));

    validateField(setFormErrors, fieldName, value, jsPattern);
  };

  const areInputsValid = () => {
    const hasAllValues =
      formData.name &&
      formData.surname &&
      formData.email &&
      formData.zipCode &&
      formData.phoneNumber &&
      formData.userClub;

    if (!hasAllValues) return false;

    const hasErrors = Object.values(formErrors).some((error) => error === true);

    return !hasErrors;
  };

  const handleSelectClub = () => {
    setIsSelectClub(true);
  };

  const handleClubSelected = (club: string) => {
    setFormData((prev: any) => ({
      ...prev,
      userClub: club,
    }));
    setIsSelectClub(false);
  };

  const handleCloseClubOptions = () => {
    setIsSelectClub(false);
  };

  const handleShowNextFormSection = () => {
    if (areInputsValid()) {
      setIsVisible({
        personalInformation: false,
        membership: true,
        review: false,
      });
    }
  };

  const isFormValid = areInputsValid();

  return (
    <>
      <div
        className={`transition-all duration-500 ${
          isVisible.personalInformation
            ? "visible translate-x-0 opacity-100"
            : "pointer-events-none invisible absolute inset-0 -translate-x-full opacity-0"
        }`}
      >
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
              3 Steps you are in
            </h2>

            <form className="mt-4 space-y-3 sm:mt-6 sm:space-y-4" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={formFields.name.placeholder}
                    value={formData.name}
                    onChange={(e) =>
                      handleChange(e, "name", formFields.name.jsPattern)
                    }
                    className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                      formErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {formErrors.name && (
                    <div
                      className="mt-1 text-xs text-red-500"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {formFields.name.errorMessage}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={formFields.surname.placeholder}
                    value={formData.surname}
                    onChange={(e) =>
                      handleChange(e, "surname", formFields.surname.jsPattern)
                    }
                    className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                      formErrors.surname
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {formErrors.surname && (
                    <div
                      className="mt-1 text-xs text-red-500"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {formFields.surname.errorMessage}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder={formFields.email.placeholder}
                  value={formData.email}
                  onChange={(e) =>
                    handleChange(e, "email", formFields.email.jsPattern)
                  }
                  className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                    formErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {formErrors.email && (
                  <div
                    className="mt-1 text-xs text-red-500"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {formFields.email.errorMessage}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder={formFields.zipCode.placeholder}
                  value={formData.zipCode}
                  onChange={(e) =>
                    handleChange(e, "zipCode", formFields.zipCode.jsPattern)
                  }
                  className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                    formErrors.zipCode
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {formErrors.zipCode && (
                  <div
                    className="mt-1 text-xs text-red-500"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {formFields.zipCode.errorMessage}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder={formFields.phoneNumber.placeholder}
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleChange(
                      e,
                      "phoneNumber",
                      formFields.phoneNumber.jsPattern,
                    )
                  }
                  className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
                    formErrors.phoneNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {formErrors.phoneNumber && (
                  <div
                    className="mt-1 text-xs text-red-500"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {formFields.phoneNumber.errorMessage}
                  </div>
                )}
              </div>

              <button
                onClick={handleSelectClub}
                type="button"
                className="w-full rounded-md border-2 border-black bg-white px-4 py-3 text-center text-sm font-bold transition-colors duration-300 hover:bg-black hover:text-white sm:px-6 sm:py-4 sm:text-base"
              >
                {formData.userClub
                  ? `Selected: ${formData.userClub}`
                  : "Select a club +"}
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
                and other information that may interest me.
              </p>

              <button
                type="button"
                disabled={!isFormValid}
                onClick={handleShowNextFormSection}
                className={`w-full rounded-md px-4 py-3 text-center text-sm font-medium transition-colors duration-300 sm:px-6 sm:py-4 sm:text-base ${
                  isFormValid
                    ? "rounded-md border-2 border-black bg-white text-black hover:bg-black hover:text-white"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
              >
                Join Today
              </button>
            </div>
          </div>
        </div>
      </div>

      <ClubOptions
        onClose={handleCloseClubOptions}
        isDisplay={isSelectClub}
        onSelectClub={handleClubSelected}
      />
    </>
  );
}
