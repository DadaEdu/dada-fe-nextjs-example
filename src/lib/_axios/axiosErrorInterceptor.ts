import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

import logger from "@/utils/logger";

const errorInterceptor = {
  onFulfilled(values: AxiosResponse) {
    return values; // 성공 응답은 통과
  },
  async onRejected(error: AxiosError) {
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized: {// 토큰 만료, 미인증 상태
        // try {
        //   const response = await postRefresh(); // 토큰 재발급
        //   // TODO: 로그인시 기본 프로필 선택
        //   setLocalStorageItem(
        //     "responseToken",
        //     JSON.stringify(response.accessToken),
        //   );
        //   if (response.accessToken) {
        //     setLocalStorageItem(
        //       "accessToken",
        //       response.accessToken.professor ??
        //         response.accessToken.doctor ??
        //         response.accessToken.master ??
        //         response.accessToken.undergraduate ??
        //         response.accessToken.employee ??
        //         response.accessToken.executive ??
        //         "",
        //     );
        //     logger.log("Logged in successfully.");
        //   }
        // } catch (refreshError) {
        //   logger.error("Login failed", refreshError);
        //   removeLocalStorageItem("accessToken");
        //   removeLocalStorageItem("responseToken");
        //   window.location.href = "/";
        // }
        logger.log("Token Authentication Failed");
        return Promise.reject(error);
      }
      // case HttpStatusCode.Forbidden: { //권한 없음(인증은 되었지만 허용되지 않은 자원 접근)
      //   const previousPage = document.referrer;

      //   if (previousPage.startsWith(window.location.origin)) {
      //     window.history.back();
      //   } else {
      //     window.location.href = "/";
      //   }

      //   return Promise.reject(error);
      // }
      default: {
        return Promise.reject(error);
      }
    }
  },
};

export default errorInterceptor;
