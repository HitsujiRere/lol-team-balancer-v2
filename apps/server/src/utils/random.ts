export const randomBetween = (begin: number, end: number) => {
  return Math.floor(Math.random() * (end - begin)) + begin;
};

export const choice = <T>(array: readonly T[]) => {
  return array[randomBetween(0, array.length)] as T;
};
