import React from "react";

export default function SelectClub() {
  const [formErrors, setFormErrors] = React.useState({
    name: false,
    surname: false,
    email: false,
    zipCode: false,
    phoneNumber: false,
  });

  const validateField = (fieldName: string, value: string, pattern: string) => {
    const regex = new RegExp(pattern);
    const isValid = regex.test(value);
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: !isValid && value.length > 0,
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <div>
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            3 Steps you are in
          </h2>

          <form className="mt-6 space-y-4" noValidate>
            <div className="flex flex-col gap-4 sm:flex-row">
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
                    validateField("name", e.target.value, "[A-Za-z\\s\\-']+")
                  }
                  className={`w-full rounded-md border p-3 placeholder-gray-400 transition-colors focus:outline-none ${
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
                    validateField("surname", e.target.value, "[A-Za-z\\s\\-']+")
                  }
                  className={`w-full rounded-md border p-3 placeholder-gray-400 transition-colors focus:outline-none ${
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
                    "email",
                    e.target.value,
                    "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
                  )
                }
                className={`w-full rounded-md border p-3 placeholder-gray-400 transition-colors focus:outline-none ${
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
                placeholder="Zip Code"
                pattern="^[A-Za-z0-9\s\-]{3,12}$"
                maxLength={12}
                minLength={3}
                required
                onChange={(e) =>
                  validateField(
                    "zipCode",
                    e.target.value,
                    "^[A-Za-z0-9\\s\\-]{3,12}$",
                  )
                }
                className={`w-full rounded-md border p-3 placeholder-gray-400 transition-colors focus:outline-none ${
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
                pattern="^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$"
                minLength={7}
                maxLength={20}
                required
                onChange={(e) =>
                  validateField(
                    "phoneNumber",
                    e.target.value,
                    "^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$",
                  )
                }
                className={`w-full rounded-md border p-3 placeholder-gray-400 transition-colors focus:outline-none ${
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
              type="submit"
              className="w-full rounded-md border-2 border-black bg-white px-6 py-4 text-center font-bold transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Select a club +
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <p className="text-xs leading-relaxed text-gray-500">
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
              and other information that may interest me. This site is protected
              by reCAPTCHA and the Google{" "}
              <span className="cursor-pointer text-black underline">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-black underline">
                Terms of Service
              </span>{" "}
              apply.
            </p>

            <button className="w-full rounded-md bg-gray-200 px-6 py-4 text-center font-medium text-gray-500 transition-colors duration-300 hover:bg-gray-300">
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
  );
}
