import type { AxiosError } from "axios";
import { useEffect } from "react";
import { api, apiPrivate, type RetryableRequestConfig } from "@/libs/api";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/services/access-token.store";
import type { AuthInterceptorProps } from "./auth-context.types";

export function AuthInterceptor({ onUserChange, onLoadingChange }: AuthInterceptorProps) {
  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        const accessToken = getAccessToken();

        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );
    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
    };
  }, []);

  useEffect(() => {
    const responseInterceptor = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig;
        originalRequest.headers ??= {};

        if (error.response?.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;

          const resToken = await api.post("/auth/refresh");
          apiPrivate.defaults.headers.common.Authorization = `Bearer ${resToken.data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${resToken.data.accessToken}`;

          const resUser = await apiPrivate.get("/auth/me");
          onUserChange(resUser.data);

          return apiPrivate(originalRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      apiPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [onUserChange]);

  useEffect(() => {
    async function restoreSession() {
      try {
        const resToken = await api.post("/auth/refresh");
        setAccessToken(resToken.data.accessToken);

        const resUser = await apiPrivate.get("/auth/me");
        onUserChange(resUser.data);
      } catch {
        clearAccessToken();
        onUserChange(null);
      } finally {
        onLoadingChange(false);
      }
    }
    restoreSession();
  }, [onUserChange, onLoadingChange]);

  return null;
}
