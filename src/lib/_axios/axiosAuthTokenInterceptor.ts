import { AxiosError, InternalAxiosRequestConfig } from "axios";

import logger from "@/utils/logger";
import { getAccessToken, getProfileId } from "@/utils/navigator.credentials";

const tokenInterceptor = { // 모든 API 요청 시 자동으로 인증 토큰을 헤더에 추가
  async onFulfilled(config: InternalAxiosRequestConfig) { //config : 요청 정보를 담은 객체
    const accessToken = await getAccessToken();
    const profileId = (await getProfileId()) ?? -1;

    if (config.headers && !!accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["X-Dada-Profile-Id"] = profileId;
    } else {
      logger.error("No access token found.");
      throw new Error("[API E`rror] No access token found.");
    }

    return config;
  },
  onRejected(error: AxiosError) {
    return Promise.reject(error);
  },
};

export default tokenInterceptor;
