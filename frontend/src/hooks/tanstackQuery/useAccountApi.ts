import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import accountApi from "../../api/accountApi";
import routes from "../../constants/routes/routes";
import { stopConnection } from "../../services/signalRService";
import { useAuthStore } from "../../stores/authStore";
import { queryClient } from "../../utils/queryClient";
import { useNavigateWithToast } from "../useNavigateWithToast";

import type { VerifyOtpPayload } from "../../types/auth";

export const useLogin = () => {
  const navigateWithToast = useNavigateWithToast();
  const setToken = useAuthStore((s) => s.setToken);
  return useMutation({
    mutationFn: accountApi.login,
    onError: () => {
      toast.error("login failed");
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigateWithToast(routes.chats, "Login successful");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: {
      email: string;
      username: string;
      password: string;
    }) => {
      return accountApi.register({ email: values.email });
    },

    onSuccess: (_, variables) => {
      navigate(routes.verifyEmail, {
        state: {
          email: variables.email,
          username: variables.username,
          password: variables.password,
        },
      });
    },
  });
};

export const useRefreshToken = () => {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: accountApi.refreshToken,
    retry: false,
    onSuccess: (data) => {
      setToken(data.accessToken);
    },
  });
};

export const useLogout = () => {
  const navigateWithToast = useNavigateWithToast();
  const clearToken = useAuthStore((state) => state.clearToken);
  return useMutation({
    mutationFn: accountApi.logout,

    onSuccess: () => {
      clearToken();
      queryClient.clear();
      stopConnection();
      navigateWithToast(routes.login, "Logout successful");
    },
  });
};

export const useVerifyOtp = () => {
  const navigateWithToast = useNavigateWithToast();
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => accountApi.verifyOtp(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
      navigateWithToast(routes.myProfile, "account created successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to verify otp")
    },
  });
};
