import z from "zod";

import { axiosClientWithAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const DADA_API_VERSION = "2.0.0";
const DADA_API_URI = "/app/thinking/a/user/my";

const responseBodyZodType = z.object({
  id: z.number(),
});

export type GetUserInfoType = z.infer<typeof responseBodyZodType>;

export const useGetUserInfo = () =>
  useQuery<GetUserInfoType, Error>({
    queryKey: [DADA_API_URI],
    queryFn: async (): Promise<GetUserInfoType> => {
      const { data } = await axiosClientWithAuth.get(DADA_API_URI, {
        headers: {
          "X-Dada-API-Version": DADA_API_VERSION,
        },
      });

      responseBodyZodType.parse(data);

      return data;
    },
  });
