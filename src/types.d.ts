declare const thinking: {
  app: {
    getAccessToken: () => Promise<string>;
    getProfileId: () => Promise<number | null>;
  };
};
