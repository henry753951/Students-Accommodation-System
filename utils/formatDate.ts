export default (date: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleString();
};
