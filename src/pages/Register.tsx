import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userProvider";
import { errorsFirebase, formValidate } from "../utils";

import { Button, FormAlert, FormInput, Title } from "../components";

export const Register = () => {
  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });

  const onSubmit = async ({ email, password }: { email: string, password: string }) => {
    try {
      await registerUser(email, password);
      navegate("/");
    } catch (error: any) {
      const { code, message } = errorsFirebase(error);
      setError(code as any, { message });
    }
  };

  return (
    <>
      <Title title="Register" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          label="Enter Email"
          placeholder="Enter an email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormAlert error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          label="Enter Password"
          placeholder="Enter a password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormAlert error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          label="Repeat Password"
          placeholder="Repeat password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          error={errors.repassword}
        >
          <FormAlert error={errors.repassword} />
        </FormInput>
        <Button text="Register"
          color="purple"
          type="submit"
          loading={false}
        />
      </form>
    </>
  );
};
