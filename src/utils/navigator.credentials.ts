export const getAccessToken = async () => {
  return await thinking.app.getAccessToken();
};

export const getProfileId = async (): Promise<number | null> => {
  return await thinking.app.getProfileId();
};
