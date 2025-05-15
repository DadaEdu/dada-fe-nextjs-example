import logger from "loglevel"; //https://www.npmjs.com/package/loglevel
// 레벨별 로그 필터링
// console.log를 지우지 않고도 환경에 따라 자동 제어 가능

const initialize = () => {
  switch (process.env.NEXT_PUBLIC_APP_MODE) { //NEXT_PUBLIC_ 접두사가 붙은 환경 변수는 Next.js에서 브라우저에서도 접근 가능하게 자동 노출됨
    case "mock":
    case "swagger":
    case "stage":
    case "dev":
      return logger.setLevel(logger.levels.DEBUG); // 개발용 - 로그 다 보이게
    case "production":
    default:
      return logger.setLevel(logger.levels.SILENT); // 배포 - 로그 출력 안 함(비활성화)
  }
};

initialize(); //앱 실행 시 한 번만 로그 레벨 설정하도록 초기화

export default logger;
