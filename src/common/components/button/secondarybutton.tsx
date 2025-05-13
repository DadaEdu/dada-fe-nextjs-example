"use client";

import styled from "styled-components";
import FilledButton from "./filledButton";

const SecondaryStyledButton = styled(FilledButton)`
  background-color: rgba(0, 0, 0, 0.12);
  color: #000000;
`;

export default function PrimaryButton() {
  return (
    <SecondaryStyledButton
      className="secondary-button"
      onClick={() => alert("파란 버튼")}
    >
      리셋
    </SecondaryStyledButton>
  );
}
