export const getAccessToken = async () => { //토큰 가져오기
  return await thinking.app.getAccessToken();  //전역 객체의 메서드를 호출하는 코드인데 이게 뭘 의미하는 지 모르겠네
};

export const getProfileId = async (): Promise<number | null> => { //ID 가져오기
  return await thinking.app.getProfileId();
};

// types.d.ts에서 thinking이라는 객체가 존재한다고 선언