export const changeString = (number) => {
  const result = number.replace('.', ',');
  return result;
};

export const changeNum = (element) => (
  element.replace(',', '.')
);

export const formattedNumber = (numberToFormat) => {
  if (typeof numberToFormat === 'string') {
    return `R$ ${numberToFormat}`;
  }
  return `R$ ${changeString(Number((numberToFormat)).toFixed(2))}`;
};
