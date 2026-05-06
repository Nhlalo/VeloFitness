import { useState, useContext } from "react";
import { VisibilityContext } from "./JoinToday";
import { formFields } from "../../data/constants/inputsvalidation";
import validateField from "../../utils/validateInputs";
import ClubOptions from "./ClubOptions";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      className="mt-1 text-xs text-red-500"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
interface FormFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  isError: boolean;
  message: string;
  classValues?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FormField({
  type = "text",
  placeholder,
  value,
  isError,
  message,
  classValues,
  handleChange,
}: FormFieldProps) {
  return (
    <div className={classValues}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full rounded-md border p-2 text-sm placeholder-gray-400 transition-colors focus:outline-none sm:p-3 sm:text-base ${
          isError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-black"
        }`}
      />
      {isError && <ErrorMessage message={message} />}
    </div>
  );
}

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
      formData.clubName;

    if (!hasAllValues) return false;

    const hasErrors = Object.values(formErrors).some((error) => error === true);

    return !hasErrors;
  };

  const handleSelectClub = () => {
    setIsSelectClub(true);
  };

  const handleClubSelected = (clubName: string) => {
    setFormData((prev: any) => ({
      ...prev,
      clubName: clubName,
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
                <FormField
                  classValues="flex-1"
                  placeholder={formFields.name.placeholder}
                  value={formData.name}
                  message={formFields.name.errorMessage}
                  isError={formErrors.name}
                  handleChange={(e) =>
                    handleChange(e, "name", formFields.name.jsPattern)
                  }
                />
                <FormField
                  classValues="flex-1"
                  placeholder={formFields.surname.placeholder}
                  value={formData.surname}
                  message={formFields.surname.errorMessage}
                  isError={formErrors.surname}
                  handleChange={(e) =>
                    handleChange(e, "surname", formFields.surname.jsPattern)
                  }
                />
              </div>

              <FormField
                type="email"
                placeholder={formFields.email.placeholder}
                value={formData.email}
                message={formFields.email.errorMessage}
                isError={formErrors.email}
                handleChange={(e) =>
                  handleChange(e, "email", formFields.email.jsPattern)
                }
              />
              <FormField
                placeholder={formFields.zipCode.placeholder}
                value={formData.zipCode}
                message={formFields.zipCode.errorMessage}
                isError={formErrors.zipCode}
                handleChange={(e) =>
                  handleChange(e, "zipCode", formFields.zipCode.jsPattern)
                }
              />
              <FormField
                type="tel"
                placeholder={formFields.phoneNumber.placeholder}
                value={formData.phoneNumber}
                message={formFields.phoneNumber.errorMessage}
                isError={formErrors.phoneNumber}
                handleChange={(e) =>
                  handleChange(
                    e,
                    "phoneNumber",
                    formFields.phoneNumber.jsPattern,
                  )
                }
              />

              <button
                onClick={handleSelectClub}
                type="button"
                className="w-full rounded-md border-2 border-black bg-white px-4 py-3 text-center text-sm font-bold transition-colors duration-300 hover:bg-black hover:text-white sm:px-6 sm:py-4 sm:text-base"
              >
                {formData.clubName
                  ? `Selected: ${formData.clubName}`
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
