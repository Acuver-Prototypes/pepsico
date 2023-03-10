import { createContext, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "../helpers/auth";
import { UserObj } from "../types";

interface Props {
  children: ReactNode;
}

interface AuthState {
  user: UserObj | null;
  loginUser: (user: UserObj) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserObj | null>(getCurrentUser());

  const loginUser = (user: UserObj) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
