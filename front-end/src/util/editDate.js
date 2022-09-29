export default function dateConfig(date) {
  const TEN = 10;
  const dateSet = date.slice(0, TEN);
  const formatedDate = dateSet.split('-').reverse().join('/');
  return formatedDate;
}
