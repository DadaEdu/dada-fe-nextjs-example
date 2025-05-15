declare const thinking: { // thinking이라는 객체가 전역(global)에서 존재하고 있다고 가정
  app: {
    getAccessToken: () => Promise<string>;
    getProfileId: () => Promise<number | null>;
  };
};
