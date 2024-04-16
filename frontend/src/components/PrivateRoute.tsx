import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";
type Props = {
  fromAuthenticatedUsers: boolean;
};

const PrivateRoute = ({ fromAuthenticatedUsers }: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (fromAuthenticatedUsers) {
    return isAuthenticated ? <Navigate to="/"  replace/> : <Outlet />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
