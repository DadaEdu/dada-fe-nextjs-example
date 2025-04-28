"use client";

import { ReactNode } from "react";
import styled from "styled-components";
interface FilledButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
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
