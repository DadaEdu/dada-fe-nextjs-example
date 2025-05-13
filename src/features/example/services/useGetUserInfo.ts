import z from "zod";
// Zod는 TypeScript와 함께 쓰는 런타임 스키마(validation) 라이브러리
// 주로 입력값 유효성 검사(Validation) 와 타입 추론(Type Inference)

import { axiosClientWithAuth } from "@/lib/axios"; //인증 필요한 커스텀 axios인스턴스 가져옴
import { useQuery } from "@tanstack/react-query";

const DADA_API_VERSION = "2.0.0";
const DADA_API_URI = "/app/thinking/a/user/my"; // api경로

const responseBodyZodType = z.object({ // zod로 응답타입 정의
  id: z.number(),
});

// Zod 타입을 TypeScript로 변환
export type GetUserInfoType = z.infer<typeof responseBodyZodType>; // 정확한 타입 추론
// GetUserInfoType = { id: number }


export const useGetUserInfo = () =>
  // useQuery => 서버에서 데이터를 가져오고(fetch), 캐싱하며, 로딩/에러/성공 상태를 자동으로 관리하는 React Hook
  useQuery<GetUserInfoType, Error>({ // useQuery<TData - 서버로부터 받아올 응답 데이터의 타입 , TError - 에러객체 타입>
    // useQuery는 get요청에 적합

    // useQuery가 반환하는 값 예시 
    // {
    //   data: GetUserInfoType | undefined;
    //   isLoading: boolean;
    //   error: Error | null;
    //   refetch:
    //   ...
    // }
    queryKey: [DADA_API_URI],
    queryFn: async (): Promise<GetUserInfoType> => { //실제 api 호출함수
      const { data } = await axiosClientWithAuth.get(DADA_API_URI, { //get요청을 보내고 리턴받은 데이터를 useQuery가 관리
                          // axiosClientWithAuth -> 자동으로 토큰 + 에러 처리 + BASE_URL 포함된 요청이 나감
        headers: {
          "X-Dada-API-Version": DADA_API_VERSION, //헤더에 버전 담아서 보냄
        },
      });

      responseBodyZodType.parse(data); // 데이터 유효성 검사

      return data;
    },
  });


  {/** POST 방식으로 유저 정보 저장 ==> useMutation사용
    import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useSaveUserInfo = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post("/api/user", userData);
      return response.data;
    },
  });
};

--------사용-----------
const { mutate, isPending, error } = useSaveUserInfo();

const handleClick = () => {
  mutate({ name: "홍길동", age: 25 });
};

    
    */}