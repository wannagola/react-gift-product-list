const STORAGE_KEY = 'user';

export const getUserFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const setUserToStorage = (user: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const clearUserStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
