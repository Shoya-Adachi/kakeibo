export const DataFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0始まりなので+1
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};
