import axios, { type AxiosRequestConfig } from "axios";
import { env } from "@/libs/env";

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const apiPrivate = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
