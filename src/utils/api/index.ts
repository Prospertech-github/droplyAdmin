import _axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { captureException } from "@sentry/react";
import { logout } from "./logout";
import { API_TOKEN } from "../../app-constants";
import refreshToken from "./refresh-token";
_axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const axios = _axios.create();

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.response?.data?.non_field_errors ||
      error?.response?.data ||
      error?.message ||
      "Network Error";

    error.message = message;

    if (error?.response?.status === 401) {
      if (
        message === "Token is invalid or expired" ||
        message === "Token is blacklisted"
      ) {
        logout();
      } else if (
        message === "Given token not valid for any token type" ||
        message === "Authentication credentials were not provided."
      ) {
        const token = {
          ls: localStorage.getItem(API_TOKEN),
          ss: sessionStorage.getItem(API_TOKEN),
        };

        if (token.ls || token.ss) {
          try {
            const data = await refreshToken(token.ls || token.ss || "");

            if (token.ls) {
              localStorage.setItem(API_TOKEN, data.refresh);
            } else if (token.ss) {
              sessionStorage.setItem(API_TOKEN, data.refresh);
            }

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data.access;

            return axios.request(error?.config);
          } catch (e) {
            logout();
          }
        } else {
          logout();
        }
      } else return Promise.reject(error);
    } else if (error?.response?.status.toString()[0] === "5") {
      captureException(error);
    } else return Promise.reject(error);
  }
);

export async function fetchUserIfTokenExists() {
  const token = {
    ls: localStorage.getItem(API_TOKEN),
    ss: sessionStorage.getItem(API_TOKEN),
  };

  if (
    (token.ls || token.ss) &&
    axios.defaults.headers.common["Authorization"]
  ) {
    return null;
  }

  if (token.ls || token.ss) {
    const data = await refreshToken(token.ls || token.ss || "");

    if (token.ls) {
      localStorage.setItem(API_TOKEN, data.refresh);
    } else if (token.ss) {
      sessionStorage.setItem(API_TOKEN, data.refresh);
    }

    axios.defaults.headers.common["Authorization"] = "Bearer " + data?.access;
  } else {
    throw new Error("No token found");
  }
}

export async function defaultQueryFn<T>({ queryKey }: QueryFunctionContext) {
  const { data } = await axios.get(queryKey.join("/"));

  return data as T;
}

// On localStorage value change from another tab, logout
//! Make this work for sessionStorage
window.addEventListener("storage", (event) => {
  if (event.key === API_TOKEN && !event.newValue) {
    logout();
  }
});
