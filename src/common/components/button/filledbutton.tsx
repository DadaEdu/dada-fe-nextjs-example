"use client";

import { ReactNode } from "react";
import styled from "styled-components";
interface FilledButtonProps { // 타입 설정
  onClick: () => void; // 아무 인자도 받지 않고 아무것도 반환하지 않는 함수
  children: ReactNode; // 컴포넌트의 내부에 들어갈 JSX 내용(React요소를 포함하는 타입)
  className?: string; // 문자열 (? - 선택적)
}

const StyledButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 0.375rem;
  border: none;
  padding: 0.75rem 1.5rem;
`;

export default function FilledButton({
  onClick,
  children,
  className = "",
}: FilledButtonProps) {
  return (
    <StyledButton onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
}


{/** baseButton을 공통으로 바꿨을 때


  "use client";

import styled from "styled-components";
import BaseButton, { BaseButtonProps } from "./BaseButton";

const StyledFilledButton = styled(BaseButton)` // => baseButton의 스타일을 가져와서 확장
  background-color: #3b82f6;
  color: white;
`;

export default function FilledButton(props: BaseButtonProps) { // props의 타입을 baseButton의 타입으로 설정
  return <StyledFilledButton {...props} />;
}

  */}