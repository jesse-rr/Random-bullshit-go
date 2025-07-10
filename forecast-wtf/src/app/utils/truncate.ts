export const Truncate = (text: string, maxLength: number = 40) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};