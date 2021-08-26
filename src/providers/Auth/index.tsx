import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";
import api from "../../services/api";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUserData {
  username: string;
  password: string;
}

interface IAuthProviderData {
  token: string;
  setAuth: Dispatch<string>;
  signIn(userData: IUserData, setError: Dispatch<boolean>, history: any): void;
}

const AuthContext = createContext<IAuthProviderData>({} as IAuthProviderData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const token = localStorage.getItem("token") || "";

  const [auth, setAuth] = useState<string>(token);

  const signIn = (
    userData: IUserData,
    setError: Dispatch<boolean>,
    history: any
  ) => {
    api
      .post("/sessions/", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        setAuth(response.data.access);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
