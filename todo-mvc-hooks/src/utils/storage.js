// 封装 window.localStorage 以支持存储 Object

const setItem = (key, value) => {
  if (value === undefined) return null;
  const parsedValue = JSON.stringify(value);
  return window.localStorage.setItem(key, parsedValue);
};

const getItem = (key) => JSON.parse(window.localStorage.getItem(key));

const removeItem = (key) => window.localStorage.removeItem(key);

const clear = () => window.localStorage.clear();

const storage = {
  setItem,
  getItem,
  removeItem,
  clear,
};

export default storage;
