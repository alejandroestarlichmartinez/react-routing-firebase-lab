import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userProvider";

export const RequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}
