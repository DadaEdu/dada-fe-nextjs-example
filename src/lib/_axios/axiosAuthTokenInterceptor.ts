import { AxiosError, InternalAxiosRequestConfig } from "axios";

import logger from "@/utils/logger";
import { getAccessToken, getProfileId } from "@/utils/navigator.credentials"; // 토큰, 아이디 가져오기

const tokenInterceptor = { // 모든 API 요청 시 자동으로 인증 토큰을 헤더에 추가
  async onFulfilled(config: InternalAxiosRequestConfig) { 
    // onFulfilled : 요청이 보내지기 직전에 axios가 실행하는 요청 인터셉터 함수
    // config : 요청에 필요한 URL, method, headers 등 정보를 담은 객체
    const accessToken = await getAccessToken(); // 토큰 가져옴
    const profileId = (await getProfileId()) ?? -1; //아이디 가져옴, 없으면 -1로 대체

    if (config.headers && !!accessToken) {
      // config.headers에 토큰 & ID 삽입
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["X-Dada-Profile-Id"] = profileId;
    } else {
      logger.error("No access token found.");
      throw new Error("[API E`rror] No access token found.");
    }

    return config;
  },
  onRejected(error: AxiosError) { // 요청 인터셉터 단계에서 에러가 발생하면 이 함수가 호출
    
    return Promise.reject(error);
  },
};

export default tokenInterceptor;
