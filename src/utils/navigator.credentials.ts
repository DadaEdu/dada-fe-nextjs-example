export const getAccessToken = async () => { //토큰 가져오기
  return await thinking.app.getAccessToken();  
};

export const getProfileId = async (): Promise<number | null> => { //ID 가져오기
  return await thinking.app.getProfileId();
};

// types.d.ts에서 thinking이라는 객체가 존재한다고 선언