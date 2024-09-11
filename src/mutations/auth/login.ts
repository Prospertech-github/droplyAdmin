import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { API_TOKEN } from "@/app-constants";
import { toast } from "react-toastify";

type Data = {
  access: string;
  refresh: string;
  rememberMe: boolean;
} & User;

async function login(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const { data: response } = await axios.post<{
    data: Data;
  }>("auth/login/", data);

  return { ...response.data, rememberMe: data.rememberMe };
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess(data: Data) {
      if (data.rememberMe) {
        localStorage.setItem(API_TOKEN, data.refresh);
      } else {
        sessionStorage.setItem(API_TOKEN, data.refresh);
      }
      axios.defaults.headers.common["Authorization"] = "Bearer " + data.access;
      queryClient.setQueriesData(["auth/users/me/"], data);
      toast.success("Login successful!");
    },
    onError(e) {
      if (isAxiosError(e)) {
        const possibleErrorMessage =
          e.response?.data?.detail ||
          e.response?.data?.error ||
          e.response?.data?.message;
        toast.error(possibleErrorMessage || "An error occurred");
      }
    },
  });
}
