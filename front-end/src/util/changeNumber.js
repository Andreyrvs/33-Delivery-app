export const changeString = (number) => {
  const result = number.replace('.', ',');
  return result;
};

export const changeNum = (element) => (
  element.replace(',', '.')
);
