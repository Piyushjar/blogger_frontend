import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthRoutes() {
  let location = useLocation();
  const { userInfo } = useContext(UserContext);

  const username = userInfo?.username;
  if (!username) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default AuthRoutes;
