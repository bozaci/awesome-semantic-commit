export const normalizeWebsiteUrl = (website: string) => {
  return website.replace(/^(https?:\/\/)?(www\.)?|\/$|\/#.*$/g, '');
};
