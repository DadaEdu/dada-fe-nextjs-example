import axios, { AxiosError } from "axios";

import tokenInterceptor from "./_axios/axiosAuthTokenInterceptor";
import errorInterceptor from "./_axios/axiosErrorInterceptor";

/**
 * @name axiosClient
 * @author Jiho Park
 * @description Axios Client used for backend API requests that require NO authentication
 * 인증이 필요 없는 API 요청용 Axios 인스턴스
 */
export const axiosClient = axios.create({
  withCredentials: true, // 쿠키나 인증 정보 포함 요청 허용
});

axiosClient.interceptors.response.use(
  errorInterceptor.onFulfilled, // 응답 성공 시 처리 로직
  errorInterceptor.onRejected,  // 에러 발생 시 처리 로직
);

/**
 * @name.axiosClientWithCredentials
 * @author Jiho Park
 * @description Axios Client used for backend API requests that REQUIRE authentication
 * 인증이 필요한 API 요청용 Axios 인스턴스
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.thinkingedu.kr";

export const axiosClientWithAuth = axios.create({
  withCredentials: true, // 쿠키나 인증 정보 포함 요청 허용
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
