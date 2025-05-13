import { TestAuthApi } from "@/features/example/components/TestAuthApi";
// 아래와 동일
// import { TestAuthApi } from "@/features/example/components/TestAuthApi/index";

export default function ExamplePage() { // localhost:3000/example로 접속 시 펼쳐지는 페이지
  return (
    <div>
      <h1>Thinking 웹뷰 테스트</h1>
      <TestAuthApi />{/** 컴포넌트 호출 */}
    </div>
  );
}
