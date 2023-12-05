import { useEffect, useState } from "react";
import { Button, FormAlert, FormInput, Title } from "../components";
import { useFirestoreState } from "../hooks";
import { useNavigate } from 'react-router-dom';
import { errorsFirebase, formValidate } from "../utils";
import { useForm } from "react-hook-form";
export const Home = () => {
  const { data, loading, error, getData, addData, deleteData } = useFirestoreState();
  const navigate = useNavigate();
  const { required, patternURL } = formValidate();
  const [copy, setCopy] = useState({ nanoid: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm({
    defaultValues: {
      url: "",
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const handleButtonDelete = async (nanoid: string) => {
    await deleteData(nanoid);
  };

  const onSubmit = async ({ url }: { url: string }) => {
    console.log("url", url);

    try {
      await addData(url);
      resetField("url");
    } catch (error: any) {
      console.log("CATCHEO", error.code);
      const { code, message } = errorsFirebase(error.code);
      setError(code as any, { message });
    }
  };

  const handleClickCopy = async (nanoid: string) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy((prev) => ({ ...prev, nanoid }));
  };

  const loadingData = loading.getData && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;

  return (
    <>
      <Title title="Home" />
      {loadingData}
      {errorData}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
        <FormInput
          label="Enter URL"
          placeholder="https://format.org/url"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          error={errors.url}
        >
          <FormAlert error={errors.url} />
        </FormInput>
        <Button
          text="Add URL"
          color="purple"
          type="submit"
          loading={loading.getDataParams}
        />
      </form>
      {data?.map(({ nanoid, origin }) => (
        <article
          key={nanoid}
          className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-3"
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {window.location.href + nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {origin}
          </p>
          <div className="flex flex-row space-x-2">
            <Button
              text="Edit"
              color="purple"
              type={undefined}
              loading={loading.getDataParams}
              onClick={() => navigate(`/edit/${nanoid}`)}
            />
            <Button
              text="Delete"
              color="red"
              type={undefined}
              loading={loading.getDataParams}
              onClick={() => handleButtonDelete(nanoid)}
            />
            <Button
              loading={false}
              type="button"
              text={copy?.nanoid === nanoid ? "Copied!" : "Copy ShortUrl"}
              color="indigo"
              onClick={() => handleClickCopy(nanoid)}
            />
          </div>
        </article >
      ))}
    </>
  );
};