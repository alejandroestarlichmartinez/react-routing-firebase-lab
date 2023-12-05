import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestoreState } from "../hooks";
import { Title } from "../components";

export const LayoutRedirect = () => {
  const [loading, setLoading] = useState(true);
  const { searchData } = useFirestoreState();
  const params = useParams();

  useEffect(() => {
    console.log(params)
    searchData(params.nanoid!).then((res: any) => {
      if (res.exists()) {
        console.log("ENTRAMOS")
        location.href = res.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title title="Loading redirection..." />;

  return <Outlet />;
};