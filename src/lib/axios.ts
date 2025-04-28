import axios, { AxiosError } from "axios";

import tokenInterceptor from "./_axios/axiosAuthTokenInterceptor";
import errorInterceptor from "./_axios/axiosErrorInterceptor";

/**
 * @name axiosClient
 * @author Jiho Park
 * @description Axios Client used for backend API requests that require NO authentication
 */
export const axiosClient = axios.create({
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  errorInterceptor.onFulfilled,
  errorInterceptor.onRejected,
);

/**
 * @name.axiosClientWithCredentials
 * @author Jiho Park
 * @description Axios Client used for backend API requests that REQUIRE authentication
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.thinkingedu.kr";

export const axiosClientWithAuth = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

axiosClientWithAuth.interceptors.request.use(
  tokenInterceptor.onFulfilled,
  tokenInterceptor.onRejected,
);

axiosClientWithAuth.interceptors.response.use(
  errorInterceptor.onFulfilled,
  errorInterceptor.onRejected,
);

export type LibAxiosErrorType = AxiosError;
export const LibAxiosError = AxiosError;

export class UnexpectedAPIResponseError extends Error {
  constructor(response: unknown = "Unexpected API response.") {
    super(`Unexpected API response: ${response}`);
  }
}
