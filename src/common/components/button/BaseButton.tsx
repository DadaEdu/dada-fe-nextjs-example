"use client";

interface BaseButtonProps { // 안 쓰이는 것 같음
  onClick: () => void;
}

export default function BaseButton({ onClick }: BaseButtonProps) { 
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return { handleClick }; // 화면에 아무것도 안 보임 - jsx 반환 X
}



{/**  공통컴포넌트로 사용하려면 
  "use client";

import { ReactNode } from "react";
import styled from "styled-components";

export interface BaseButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const StyledBaseButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

export default function BaseButton({
  onClick,
  children,
  className = "",
}: BaseButtonProps) {
  return (
    <StyledBaseButton onClick={onClick} className={className}>
      {children}
    </StyledBaseButton>
  );
}

  */}