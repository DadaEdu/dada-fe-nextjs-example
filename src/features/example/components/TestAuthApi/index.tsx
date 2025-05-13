"use client"; // 클라이언트 컴포넌트 선언 -> javascript 동작기능이나 React hook 등을 사용해야할 때

import styled from "styled-components";
//styled-components -> use client 필요

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

export const TestAuthApi: React.FC = () => { // React.FC - Functional Component를 타입스크립트에서 명확히 정의해주는 타입
  const { //useQuery에서 관리하는 데이터를 구조분해 -> 타입설정이 필요하지 않은 이유는?? -> 이미 타입이 지정된 useQuery를 리턴
    data: getUserInfoData,
    isLoading: getUserInfoIsLoading,
    error: getUserInfoError,
    refetch: refetchUserInfo, //refetch는 내부적으로 queryFn을 다시 실행
  } = useGetUserInfo(); // 리액트 훅

  
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
