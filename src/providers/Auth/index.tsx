import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

interface IAuthProviderProps {
  children: ReactNode;
}

interface ISignInData {
  email: string;
  password: string;
}

interface ISignUpData {
  username: string;
  password: string;
  email: string;
}

interface IAuthProviderData {
  token: string;
  setAuth: Dispatch<string>;
  signIn: (userData: ISignInData, setError: Dispatch<boolean>) => void;
  signUp: (userData: ISignUpData, setError: Dispatch<boolean>) => void;
}

const AuthContext = createContext<IAuthProviderData>({} as IAuthProviderData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const token = localStorage.getItem("token") || "";

  const [auth, setAuth] = useState<string>(token);
  const history = useHistory();

  const signIn = (userData: ISignInData, setError: Dispatch<boolean>) => {
    api
      .post("/login/", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuth(response.data.accessToken);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  const signUp = (userData: ISignUpData, setError: Dispatch<boolean>) => {
    api
      .post("/register", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuth(response.data.accessToken);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
