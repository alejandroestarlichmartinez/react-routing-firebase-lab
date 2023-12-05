export const errorsFirebase = (error: { code: string, message: string }) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return { code: "email", message: "User already registered" };

    case "auth/invalid-email":
      return { code: "email", message: "Email format not valid" };

    case "auth/invalid-email-verified":
      return { code: "email", message: "Email not verified" };

    case "auth/invalid-password":
      return {
        code: "password",
        message: "Min 6 characters",
      };

    case "auth/user-not-found":
      return { code: "email", message: "User not found" };

    case "auth/wrong-password":
      return { code: "password", message: "Password not correct" };

    default:
      return { code: "email", message: "Error, try again later" };
  }
};