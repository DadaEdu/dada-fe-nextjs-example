"use client";
import FilledButton from "@/common/components/button/filledButton"; // 파일 대소문자가 다름
import PrimaryButton from "@/common/components/button/primaryButton";
import SecondaryButton from "@/common/components/button/secondaryButton";
export default function TimerPage() { // localhost:3000/timer로 접속 시 펼쳐지는 페이지
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


{/** baseButton을 활용한다는 가정하에
  
  import FilledButton from "@/components/buttons/FilledButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

export default function TimerPage() {
  return (
    <div>
      <FilledButton onClick={() => alert("Filled")}>타이머 시작</FilledButton>
      <PrimaryButton onClick={() => alert("Primary")}>일시정지</PrimaryButton>
      <SecondaryButton onClick={() => alert("Secondary")}>초기화</SecondaryButton>
    </div>
  );
}
 */}