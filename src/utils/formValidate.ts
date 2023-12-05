export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "This field is required",
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Incorrect email format",
    },
    patternURL: {
      value:
      /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: "Incorrect URL format",
    },
    minLength: {
      value: 6,
      message: "Min 6 characters",
    },
    validateTrim: {
      trim: (v: string) => {
        if (!v.trim()) {
          return "Don't be 🤡, write something";
        }
        return true;
      },
    },
    validateEquals(value: string) {
      return {
        equals: (v: string) => v === value || "Passwords don't match",
      };
    },
  };
};
