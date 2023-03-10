import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={`/auth/login`} replace />;
  }

  return children;
};

export default PrivateRoute;
