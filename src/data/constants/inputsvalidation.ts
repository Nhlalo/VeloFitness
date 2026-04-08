// Form field configurations

export const formFields = {
  name: {
    jsxPattern: "[A-Za-z\s\-']+", // Single backslashes for JSX
    jsPattern: "[A-Za-z\\s\\-']+", // Double backslashes for JavaScript
    placeholder: "Name",
    title: "Only letters, spaces, hyphens, and apostrophes allowed",
    minLength: 2,
    maxLength: 50,
    errorMessage:
      "Please enter a valid name (letters, spaces, hyphens, apostrophes only)",
  },
  surname: {
    jsxPattern: "[A-Za-z\s\-']+",
    jsPattern: "[A-Za-z\\s\\-']+",
    placeholder: "Surname",
    title: "Only letters, spaces, hyphens, and apostrophes allowed",
    minLength: 2,
    maxLength: 50,
    errorMessage:
      "Please enter a valid surname (letters, spaces, hyphens, apostrophes only)",
  },
  email: {
    jsxPattern: "[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}",
    jsPattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
    placeholder: "Email",
    maxLength: 254,
    errorMessage: "Please enter a valid email address",
  },
  zipCode: {
    jsxPattern: "^[A-Za-z0-9\s\-]{3,12}$",
    jsPattern: "^[A-Za-z0-9\\s\\-]{3,12}$",
    placeholder: "Zip or Postal Code",
    minLength: 3,
    maxLength: 12,
    errorMessage:
      "Please enter a valid zip code (3-12 characters, letters, numbers, spaces, hyphens)",
  },
  phoneNumber: {
    jsxPattern:
      "^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$", // Single backslashes
    jsPattern:
      "^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$", // Double backslashes
    placeholder: "+1 (234) 567-8900",
    minLength: 7,
    maxLength: 20,
    errorMessage: "Please enter a valid phone number",
  },
};
