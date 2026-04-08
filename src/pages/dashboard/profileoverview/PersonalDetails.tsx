import { formFields } from "../../../data/constants/inputsvalidation";
import { User } from "../../../types/user.interface";

interface Props {
  user: User;
  formErrors: Record<string, boolean>;
  isEditing: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
    jsPattern: string,
  ) => void;
  handleEditClick: () => void;
  handleCancelClick: () => void;
  handleSaveClick: () => void;
}
export default function PersonalDetails({
  user,
  formErrors,
  isEditing,
  handleChange,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
}: Props) {
  return (
    <div className="group">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-mono text-sm tracking-wider text-white/40 uppercase">
            Personal Information
          </h2>
          <p className="mt-1 text-xs text-white/30">
            Your identity & contact details
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancelClick}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-6">
          <div
            className={`border-b pb-3 transition-colors ${
              formErrors.name
                ? "border-red-500"
                : "border-white/10 group-hover:border-white/30"
            }`}
          >
            <div className="mb-1 font-mono text-xs text-white/40">
              First Name
            </div>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) =>
                handleChange(e, "name", formFields.name.jsPattern)
              }
              readOnly={!isEditing}
              pattern={formFields.name.jsxPattern}
              title={formFields.name.title}
              minLength={formFields.name.minLength}
              maxLength={formFields.name.maxLength}
              required
              className={`w-full bg-transparent text-xl font-light tracking-wide focus:outline-none ${
                !isEditing
                  ? "cursor-default"
                  : "focus:border-b focus:border-white/50"
              } ${formErrors.name ? "text-red-400" : ""}`}
            />
            {formErrors.name && (
              <div className="mt-1 text-xs text-red-400">
                {formFields.name.errorMessage}
              </div>
            )}
          </div>

          <div
            className={`border-b pb-3 transition-colors ${
              formErrors.surname
                ? "border-red-500"
                : "border-white/10 group-hover:border-white/30"
            }`}
          >
            <div className="mb-1 font-mono text-xs text-white/40">
              Last Name
            </div>
            <input
              type="text"
              name="surname"
              value={user.surname}
              onChange={(e) =>
                handleChange(e, "surname", formFields.surname.jsPattern)
              }
              readOnly={!isEditing}
              pattern={formFields.surname.jsxPattern}
              title={formFields.surname.title}
              minLength={formFields.surname.minLength}
              maxLength={formFields.surname.maxLength}
              required
              className={`w-full bg-transparent text-xl font-light tracking-wide focus:outline-none ${
                !isEditing
                  ? "cursor-default"
                  : "focus:border-b focus:border-white/50"
              } ${formErrors.surname ? "text-red-400" : ""}`}
            />
            {formErrors.surname && (
              <div className="mt-1 text-xs text-red-400">
                {formFields.surname.errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Email */}
        <div
          className={`border-b pb-3 transition-colors ${
            formErrors.email
              ? "border-red-500"
              : "border-white/10 group-hover:border-white/30"
          }`}
        >
          <div className="mb-1 font-mono text-xs text-white/40">
            Email Address
          </div>
          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) =>
                handleChange(e, "email", formFields.email.jsPattern)
              }
              readOnly={!isEditing}
              pattern={formFields.email.jsxPattern}
              maxLength={formFields.email.maxLength}
              required
              className={`flex-1 bg-transparent text-lg font-light tracking-wide focus:outline-none ${
                !isEditing
                  ? "cursor-default"
                  : "focus:border-b focus:border-white/50"
              } ${formErrors.email ? "text-red-400" : ""}`}
            />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
              verified
            </span>
          </div>
          {formErrors.email && (
            <div className="mt-1 text-xs text-red-400">
              {formFields.email.errorMessage}
            </div>
          )}
        </div>

        {/* Phone & Zip Row */}
        <div className="grid grid-cols-2 gap-6">
          <div
            className={`border-b pb-3 transition-colors ${
              formErrors.phoneNumber
                ? "border-red-500"
                : "border-white/10 group-hover:border-white/30"
            }`}
          >
            <div className="mb-1 font-mono text-xs text-white/40">
              Phone Number
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={(e) =>
                handleChange(e, "phoneNumber", formFields.phoneNumber.jsPattern)
              }
              readOnly={!isEditing}
              pattern={formFields.phoneNumber.jsxPattern}
              minLength={formFields.phoneNumber.minLength}
              maxLength={formFields.phoneNumber.maxLength}
              required
              className={`w-full bg-transparent text-lg font-light tracking-wide focus:outline-none ${
                !isEditing
                  ? "cursor-default"
                  : "focus:border-b focus:border-white/50"
              } ${formErrors.phoneNumber ? "text-red-400" : ""}`}
            />
            {formErrors.phoneNumber && (
              <div className="mt-1 text-xs text-red-400">
                {formFields.phoneNumber.errorMessage}
              </div>
            )}
          </div>

          <div
            className={`border-b pb-3 transition-colors ${
              formErrors.zipCode
                ? "border-red-500"
                : "border-white/10 group-hover:border-white/30"
            }`}
          >
            <div className="mb-1 font-mono text-xs text-white/40">
              Postal Code
            </div>
            <input
              type="text"
              name="zipCode"
              value={user.zipCode}
              onChange={(e) =>
                handleChange(e, "zipCode", formFields.zipCode.jsPattern)
              }
              readOnly={!isEditing}
              pattern={formFields.zipCode.jsxPattern}
              minLength={formFields.zipCode.minLength}
              maxLength={formFields.zipCode.maxLength}
              required
              className={`w-full bg-transparent text-lg font-light tracking-wide focus:outline-none ${
                !isEditing
                  ? "cursor-default"
                  : "focus:border-b focus:border-white/50"
              } ${formErrors.zipCode ? "text-red-400" : ""}`}
            />
            {formErrors.zipCode && (
              <div className="mt-1 text-xs text-red-400">
                {formFields.zipCode.errorMessage}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
