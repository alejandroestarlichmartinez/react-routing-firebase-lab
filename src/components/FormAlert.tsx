import { FieldError } from "react-hook-form";

interface Props {
  error: FieldError | undefined;
}

export const FormAlert: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops! </span>
          {error.message}
        </p>
      )}
    </>
  );
};