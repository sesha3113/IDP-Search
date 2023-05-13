const setSessionStorage = (name, value) => {
  if (name && value) {
    sessionStorage.setItem(name, JSON.stringify(value));
  }
};

const getSessionStorage = (name) => {
  var sessionData = sessionStorage.getItem(name);
  return JSON.parse(sessionData);
};

const clearSessionStorage = (name) => {
  sessionStorage.removeItem(name);
}

const stringify = (value) => {
  return JSON.stringify(value);
};

const parser = (value) => {
  return JSON.parse(value);
};

export const utils = {
  setSessionStorage,
  getSessionStorage,
  stringify,
  parser,
  clearSessionStorage
};
