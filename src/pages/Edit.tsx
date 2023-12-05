import { useEffect, useState } from "react";
import { useFirestoreState } from "../hooks";
import { useParams } from "react-router-dom";
import { Button, FormInput, Title } from "../components";
import { useNavigate } from 'react-router-dom';

export const Edit = () => {
  const params = useParams();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { getDataParams, loading, error, updateData } = useFirestoreState();

  useEffect(() => {
    console.log("getUrlDB", params.nanoid);

    getDataParams(params.nanoid!).then((res: any) => setUrl(res));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    updateData(params.nanoid!, url).then(() => navigate("/"));
  };

  const loadingData = loading.getDataParams && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;

  return (
    <>
      <Title title="Edit" />
      {errorData}
      {loadingData}
      {url !== "" && (
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            value={url}
            onChange={(e: any) => setUrl(e.target.value)}
          />
          <Button
            text="Edit"
            color="purple"
            type="submit"
            loading={loading.getDataParams}
          />
        </form>
      )}
    </>
  );
};
