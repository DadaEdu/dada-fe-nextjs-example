"use client";

import styled from "styled-components";

import { useGetUserInfo } from "../../services/useGetUserInfo";

const TestApiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TestApiHeader = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const TestApiContent = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const RefetchButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const TestAuthApi: React.FC = () => { //useQuery에서 관리하는 데이터를 구조분해
  const {
    data: getUserInfoData,
    isLoading: getUserInfoIsLoading,
    error: getUserInfoError,
    refetch: refetchUserInfo,
  } = useGetUserInfo();
  console.log("data", getUserInfoData);  //undefined
  console.log("isLoading", getUserInfoIsLoading);  //true or false
  console.log("error", getUserInfoError);  //null or 
  // data ReferenceError: thinking is not defined - 에러메시지
  // at getAccessToken (navigator.credentials.ts:2:3)
  // at onFulfilled (axiosAuthTokenInterceptor.ts:8:44)
  // at async Axios.request (Axios.js:40:14)
  // at async useGetUserInfo.useQuery (useGetUserInfo.ts:22:24)
  // at Axios.request (Axios.js:45:41)
  // at async useGetUserInfo.useQuery (useGetUserInfo.ts:22:24)
  
  return (
    <TestApiContainer>
      <TestApiHeader>Test Get User Info</TestApiHeader>
      <TestApiContent>
        User Id: {getUserInfoIsLoading ? "Loading..." : getUserInfoData?.id}
        Error: {getUserInfoError?.message}
      </TestApiContent>
      <RefetchButton onClick={() => refetchUserInfo()}>Refetch</RefetchButton>
    </TestApiContainer>
  );
};
