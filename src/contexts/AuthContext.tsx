import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, parseCookies, destroyCookie } from "nookies";

// SERVICES
import { api } from "../services/api";
import { createSession, getUser } from "../services";

// TYPES
import { IClient, IEstablishment } from "../types";
type SignInCredentials = {
  email: string;
  password: string;
};

type User = IClient & IEstablishment;

type AuthContextData = {
  user?: User;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "reactauth.token");
  destroyCookie(undefined, "reactauth.refreshToken");

  authChannel.postMessage({ message: "signOut" });
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  //! Get Data User
  useEffect(() => {
    const { "reactauth.token": token } = parseCookies();

    if (token) {
      getUser()
        .apiCall()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  //! Sign Out
  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data.message) {
        case "signOut":
          setUser(undefined);
          navigate("/", { replace: true });
          break;

        case "signIn":
          if (message.data?.is_establishment) {
            navigate("/establishment/dashboard", { replace: true });
          } else {
            navigate("/client/dashboard", { replace: true });
          }
          break;

        default:
          break;
      }
    };
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const {
      data: { token, refresh_token, user },
    } = await createSession().apiCall({
      email,
      password,
    });

    setCookie(undefined, "reactauth.token", token, {
      path: "/", // Any address in the app will have access to the token
      maxAge: 24 * 60 * 60 * 30, // 30 days - Who checks if it has expired is the back, front does not need
    });
    setCookie(undefined, "reactauth.refreshToken", refresh_token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 30,
    });

    setUser({
      email,
      ...user,
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    authChannel.postMessage({
      message: "signIn",
      is_establishment: user.is_establishment,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
