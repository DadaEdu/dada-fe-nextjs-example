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

export const TestAuthApi: React.FC = () => {
  const {
    data: getUserInfoData,
    isLoading: getUserInfoIsLoading,
    error: getUserInfoError,
    refetch: refetchUserInfo,
  } = useGetUserInfo();

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
