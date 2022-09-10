import axios, { AxiosError } from "axios";
import { setCookie, parseCookies } from "nookies";

// UTILS
import { signOut } from "../contexts/AuthContext";

interface AxiosErrorResponse {
  code?: string;
}
interface IFailedRequestQueue {
  /** @description If the refresh token works */
  onSuccess: (token: string) => void;
  /** @description If the refresh token goes wrong */
  onFailure: (err: AxiosError) => void;
}

let cookies = parseCookies();

/** @description Saves if token refresh is occurring */
let isRefreshing = false;
/** @description Queue of requests that must wait for the token refresh */
let failedRequestsQueue: IFailedRequestQueue[] = [];

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

api.defaults.headers.common[
  "Authorization"
] = `Bearer ${cookies?.["reactauth.token"]}`;

// 1st Parameter: Answer that was successful
// 2nd Parameter: Answer gone wrong
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<AxiosErrorResponse>) => {
    if (error?.response?.status === 401) {
      if (error?.response?.data?.code === "token.expired") {
        //! Refresh Token

        cookies = parseCookies();

        const { "reactauth.refreshToken": refreshToken } = cookies;

        /**
         * @description
         * - All requisition configuration;
         * - Including the callbacks that must be executed, that is,
         * you can go back to the function in the component where the request was called
         * */
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post("/refresh", { refreshToken })
            .then((response) => {
              const { token } = response.data;

              setCookie(undefined, "reactauth.token", token, {
                path: "/",
                maxAge: 24 * 60 * 60 * 30,
              });
              setCookie(
                undefined,
                "reactauth.refreshToken",
                response.data.refreshToken,
                {
                  path: "/",
                  maxAge: 24 * 60 * 60 * 30,
                }
              );

              api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(token)
              );
              failedRequestsQueue = [];
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err));
              failedRequestsQueue = [];

              signOut();
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        /**
         * @description
         * - You have to put Promise, because axios doesn't accept async,
         * in the documentation they tell you to use Promise.
         * - Here two functions are added to the request queue:
         *   + onSuccess: if the refresh token is correct and receives as
         *     parameter the new token, and runs the solve by executing the call again;
         *   + onFailure: if the refresh token does not work
         */
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (!originalConfig.headers) return;
              originalConfig.headers["Authorization"] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        //! Unlogin User
        signOut();
      }
    }

    return Promise.reject(error);
  }
);

export const { CancelToken, isCancel, isAxiosError } = axios;
