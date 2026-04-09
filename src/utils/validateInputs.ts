export default function validateField<T extends Record<string, any>>(
  setFormErrors: React.Dispatch<React.SetStateAction<T>>,
  fieldName: string,
  value: string,
  pattern: string,
) {
  const regex = new RegExp(pattern);
  const isValid = regex.test(value);
  setFormErrors((prev) => ({
    ...prev,
    [fieldName]: !isValid && value.length > 0,
  }));
}

function isInputValid(pattern: string, value: string) {
  const regex = new RegExp(pattern);
  const isValid = regex.test(value);
  return isValid;
}
export { isInputValid };
