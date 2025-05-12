import z from "zod";
// Zod는 TypeScript와 함께 쓰는 런타임 스키마(validation) 라이브러리
// 주로 입력값 유효성 검사(Validation) 와 타입 추론(Type Inference)

import { axiosClientWithAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const DADA_API_VERSION = "2.0.0";
const DADA_API_URI = "/app/thinking/a/user/my";

const responseBodyZodType = z.object({ // 객체 스키마 생성
  id: z.number(),
});

export type GetUserInfoType = z.infer<typeof responseBodyZodType>; // 정확한 타입 추론

export const useGetUserInfo = () =>
  // useQuery => 서버에서 데이터를 가져오고(fetch), 캐싱하며, 로딩/에러/성공 상태를 자동으로 관리하는 React Hook
  useQuery<GetUserInfoType, Error>({
    queryKey: [DADA_API_URI],
    queryFn: async (): Promise<GetUserInfoType> => {
      const { data } = await axiosClientWithAuth.get(DADA_API_URI, { //get요청을 보내고 리턴받은 데이터를 useQuery가 관리
        headers: {
          "X-Dada-API-Version": DADA_API_VERSION,
        },
      });

      responseBodyZodType.parse(data);

      return data;
    },
  });
