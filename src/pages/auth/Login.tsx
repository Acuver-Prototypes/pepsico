import { Navigate } from "react-router-dom";
import Logo from "../../components/Logos/Logo";
import LogoColor from "../../components/Logos/LogoColor";
import useAuth from "../../hooks/useAuth";
import { ALL_ROLES } from "../../types/constants";

const Login = () => {
  const { user, loginUser } = useAuth();

  if (user) {
    return <Navigate to={`/`} replace />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="card flex flex-col gap-y-14 bg-white border border-blue-500 shadow-lg p-4 rounded items-center w-1/2 h-1/2 justify-center">
      <img className="w-52" src={require("../../assets/pepsico.png")} alt="logo" />

        <div className="actions flex items-center flex-col gap-y-3">
          <button
            onClick={() => {
              loginUser({
                role: ALL_ROLES.ADMIN,
                username: "John Doe",
                email: "johndoe@pepsico.com",
              });
            }}
            className="btn btn-primary font-bold w-44 py-3"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
