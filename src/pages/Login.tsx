import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userProvider";
import { useForm } from "react-hook-form";
import { errorsFirebase, formValidate } from "../utils";

import { Button, ButtonLoading, FormAlert, FormInput, Title } from "../components";

export const Login = () => {
  const navegate = useNavigate();
  const { loginUser, loading, setLoading } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: { email: string, password: string }) => {
    setLoading(true);
    try {
      await loginUser(email, password);
      navegate("/");
    } catch (error: any) {
      const { code, message } = errorsFirebase(error);
      setError(code as any, { message });
    } finally {
      setLoading(false);
    }
  };

  const buttonSubmit = loading ? (
    <ButtonLoading />
  ) : (
    <Button
      text="Login"
      color="purple"
      loading={loading}
      type="submit"
    />
  );

  return (
    <>
      <Title title="Login" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Enter an email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
          label="Enter an Email"
        >
          <FormAlert error={errors.email} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="Enter a password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
          label="Enter a Password"
        >
          <FormAlert error={errors.password} />
        </FormInput>
        {buttonSubmit}
      </form>
    </>
  );
};
