export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

export const filterRecord = (data: any, key: string, value: any) => {
  const filter = data.filter((item: any) => item[key] === value);
  return filter.length > 0 ? filter : [];
};
