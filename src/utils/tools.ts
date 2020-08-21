const parse = (val: string | null | undefined) => {
  return val && val !== "undefined" ? JSON.parse(val) : "";
};
const strinify = (val: string | {}) => JSON.stringify(val);
export const getItem = (key: string = "info") => {
  return key ? parse(localStorage.getItem(key)) : {};
};

export const setItem = (key: string, val: string | {}) => {
  localStorage.setItem(key, strinify(val));
};
