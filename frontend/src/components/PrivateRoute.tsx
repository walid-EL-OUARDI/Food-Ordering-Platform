import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
