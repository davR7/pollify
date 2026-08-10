import type { AxiosError } from "axios";
import type { PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";
import { api, apiPrivate, type RetryableRequestConfig } from "@/libs/api";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/services/access-token.store";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./auth.types";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    const responseInterceptor = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig;
        originalRequest.headers ??= {};
        if (error.response?.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;
          const resRefresh = await api.post("/auth/refresh");
          apiPrivate.defaults.headers.common.Authorization = `Bearer ${resRefresh.data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${resRefresh.data.accessToken}`;
          const resProfile = await apiPrivate.get("/auth/me");
          setUser(resProfile.data);
          return apiPrivate(originalRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      apiPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useLayoutEffect(() => {
    async function restoreSession() {
      try {
        const restoken = await api.post("/auth/refresh");
        setAccessToken(restoken.data.accessToken);
        const resUser = await apiPrivate.get("/auth/me");
        setUser(resUser.data);
      } catch {
        clearAccessToken()
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
}
