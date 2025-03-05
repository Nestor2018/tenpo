import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log(isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>; // Mostramos algo mientras se rehidrata
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
