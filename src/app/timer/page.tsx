"use client";
import FilledButton from "@/common/components/button/FilledButton";
import PrimaryButton from "@/common/components/button/PrimaryButton";
import SecondaryButton from "@/common/components/button/SecondaryButton";
export default function TimerPage() {
  return (
    <div>
      <FilledButton className="start-button" onClick={() => alert("빨간 버튼")}>
        타이머 시작
      </FilledButton>
      <PrimaryButton />
      <SecondaryButton />
    </div>
  );
}
