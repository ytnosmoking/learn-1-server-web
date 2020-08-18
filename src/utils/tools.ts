const parse = (key: string | null | undefined) => {
  return key && key !== "undefined" ? JSON.parse(key) : {};
};
const strinify = (val: string | {}) => JSON.stringify(val);
export const getItem = (key: string = "info") => {
  return key ? parse(localStorage.getItem(key)) : {};
};

export const setItem = (key: string, val: string | {}) => {
  localStorage.setItem(key, strinify(val));
};
