"use client";

import FilledButton from "./FilledButton";
import styled from "styled-components";

// FilledButton 의 스타일을 불러와서(button) 스타일 확장
const PrimaryStyledButton = styled(FilledButton)`
  background-color: #2170eb;
  color: #ffffff;
`;

export default function PrimaryButton() {
  return (
    <PrimaryStyledButton
      className="primary-button"
      onClick={() => alert("파란 버튼")}
    >
      일시정지
    </PrimaryStyledButton>
  );
}
