import { formFields } from "../../../data/constants/inputsvalidation";
import { User } from "../../../types/user.interface";
import ErrorMessage from "../../../components/shared/ErrorMessage";

function FormFieldContainer({
  children,
  isError,
}: {
  children: React.ReactNode;
  isError: boolean;
}) {
  return (
    <div
      className={`border-b pb-3 transition-colors ${
        isError
          ? "border-red-500"
          : "border-white/10 group-hover:border-white/30"
      }`}
    >
      {children}
    </div>
  );
}

interface InputProps {
  type?: string;
  inputName: string;
  value: string | undefined;
  jsxPattern: string;
  isEditing: boolean;
  title?: string;
  minLength: number;
  maxLength: number;
  isError: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type = "text",
  inputName,
  value,
  jsxPattern,
  isEditing,
  minLength,
  maxLength,
  isError,
  title,
  handleChange,
}: InputProps) {
  return (
    <input
      type={type}
      name={inputName}
      value={value}
      onChange={handleChange}
      readOnly={!isEditing}
      pattern={jsxPattern}
      title={title}
      minLength={minLength}
      maxLength={maxLength}
      required
      className={`w-full bg-transparent text-xl font-light tracking-wide focus:outline-none ${
        !isEditing ? "cursor-default" : "focus:border-b focus:border-white/50"
      } ${isError ? "text-red-400" : ""}`}
    />
  );
}

interface PersonalDetailsProps {
  user: User | null;
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
}: PersonalDetailsProps) {
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
        <div className="grid grid-cols-2 gap-6">
          <FormFieldContainer isError={formErrors.name}>
            <div className="mb-1 font-mono text-xs text-white/40">
              First Name
            </div>
            <Input
              inputName="name"
              value={user?.name}
              handleChange={(e) =>
                handleChange(e, "name", formFields.name.jsPattern)
              }
              jsxPattern={formFields.name.jsxPattern}
              title={formFields.name.title}
              minLength={formFields.name.minLength}
              maxLength={formFields.name.maxLength}
              isEditing={isEditing}
              isError={formErrors.name}
            />
            {formErrors.name && (
              <ErrorMessage message={formFields.name.errorMessage} />
            )}
          </FormFieldContainer>

          <FormFieldContainer isError={formErrors.surname}>
            <div className="mb-1 font-mono text-xs text-white/40">
              Last Name
            </div>
            <Input
              inputName="surname"
              value={user?.surname}
              handleChange={(e) =>
                handleChange(e, "surname", formFields.surname.jsPattern)
              }
              jsxPattern={formFields.surname.jsxPattern}
              title={formFields.surname.title}
              minLength={formFields.surname.minLength}
              maxLength={formFields.surname.maxLength}
              isEditing={isEditing}
              isError={formErrors.surname}
            />
            {formErrors.surname && (
              <ErrorMessage message={formFields.surname.errorMessage} />
            )}
          </FormFieldContainer>
        </div>

        <FormFieldContainer isError={formErrors.email}>
          <div className="mb-1 font-mono text-xs text-white/40">
            Email Address
          </div>
          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={user?.email}
              readOnly
              className={`flex-1 bg-transparent text-lg font-light tracking-wide focus:outline-none`}
            />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
              verified
            </span>
          </div>
        </FormFieldContainer>

        <div className="grid grid-cols-2 gap-6">
          <FormFieldContainer isError={formErrors.phoneNumber}>
            <div className="mb-1 font-mono text-xs text-white/40">
              Phone Number
            </div>
            <Input
              type="tel"
              inputName="phoneNumber"
              value={user?.phoneNumber}
              handleChange={(e) =>
                handleChange(e, "phoneNumber", formFields.phoneNumber.jsPattern)
              }
              jsxPattern={formFields.phoneNumber.jsxPattern}
              minLength={formFields.phoneNumber.minLength}
              maxLength={formFields.phoneNumber.maxLength}
              isEditing={isEditing}
              isError={formErrors.phoneNumber}
            />
            {formErrors.phoneNumber && (
              <ErrorMessage message={formFields.phoneNumber.errorMessage} />
            )}
          </FormFieldContainer>

          <FormFieldContainer isError={formErrors.zipCode}>
            <div className="mb-1 font-mono text-xs text-white/40">
              Postal Code
            </div>
            <Input
              inputName="zipCode"
              value={user?.zipCode}
              handleChange={(e) =>
                handleChange(e, "zipCode", formFields.zipCode.jsPattern)
              }
              jsxPattern={formFields.zipCode.jsxPattern}
              minLength={formFields.zipCode.minLength}
              maxLength={formFields.zipCode.maxLength}
              isEditing={isEditing}
              isError={formErrors.zipCode}
            />

            {formErrors.zipCode && (
              <ErrorMessage message={formFields.zipCode.errorMessage} />
            )}
          </FormFieldContainer>
        </div>
      </form>
    </div>
  );
}
