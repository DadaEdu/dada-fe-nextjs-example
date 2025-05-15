import { TestAuthApi } from "@/features/example/components/TestAuthApi";
// 아래와 동일
// import { TestAuthApi } from "@/features/example/components/TestAuthApi/index";

export default function ExamplePage() { 
  return (
    <div>
      <h1>Thinking 웹뷰 테스트</h1>
      <TestAuthApi />{/** 컴포넌트 호출 */}
    </div>
  );
}
