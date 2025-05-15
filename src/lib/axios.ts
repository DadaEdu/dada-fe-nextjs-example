import axios, { AxiosError } from "axios";

import tokenInterceptor from "./_axios/axiosAuthTokenInterceptor";
import errorInterceptor from "./_axios/axiosErrorInterceptor";

/**
 * @name axiosClient
 * @author Jiho Park
 * @description Axios Client used for backend API requests that require NO authentication
 * 인증이 필요 없는 API 요청용 Axios 인스턴스
 */
export const axiosClient = axios.create({ //커스텀 axios 인스턴스 생성
  withCredentials: true, // 요청 시 브라우저가 쿠키(세션 등)를 자동 포함하도록 설정
});

axiosClient.interceptors.response.use(
  errorInterceptor.onFulfilled, // 응답 성공 시 처리 로직
  errorInterceptor.onRejected,  // 에러 발생 시 처리 로직
);

/**
 * @name.axiosClientWithCredentials // 왜 axiosClientWithAuth 가 아닐까
 * @author Jiho Park
 * @description Axios Client used for backend API requests that REQUIRE authentication
 * 인증이 필요한 API 요청용 Axios 인스턴스
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.thinkingedu.kr";

export const axiosClientWithAuth = axios.create({ //커스텀 axios 인스턴스 생성
  withCredentials: true, // 쿠키나 인증 정보 포함 요청 허용
  baseURL: BASE_URL, // 기본 주소
});

axiosClientWithAuth.interceptors.request.use( // 요청 인터셉터 (Request) : 요청이 서버로 나가기 전에 실행됨, 주로 인증 토큰 자동 삽입에 사용
  tokenInterceptor.onFulfilled, // 요청 전에 토큰 자동 삽입
  tokenInterceptor.onRejected,
);

axiosClientWithAuth.interceptors.response.use( // 응답 인터셉터 (Response) : 응답이 도착한 후 실행됨, 주로 에러 처리나 공통 응답 가공에 사용
  errorInterceptor.onFulfilled, // 응답 성공 시 처리
  errorInterceptor.onRejected,  // 응답 에러 시 처리
);

// 공통 에러 도구
//  AxiosError는 axios에서 발생할 수 있는 표준 에러 타입
export type LibAxiosErrorType = AxiosError; //LibAxiosErrorType이라는 별칭으로 error타입을 보냄

export const LibAxiosError = AxiosError; 
//AxiosError 클래스를 LibAxiosError라는 이름으로 그대로 내보냄. 
// (클래스로서의 AxiosError를 직접 사용할 수 있게 하기 위해) ex) throw new LibAxiosError("Unauthorized");


export class UnexpectedAPIResponseError extends Error { //API 응답이 예상한 형태가 아닐 때 던질 수 있는 커스텀 에러 클래스
  constructor(response: unknown = "Unexpected API response.") {
    super(`Unexpected API response: ${response}`); // 에러 메시지 설정
  }
}
