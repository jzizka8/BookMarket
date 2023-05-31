import { useState } from 'react';
import UserDataType from '../types/UserDataType';

export const useLocalStorage = (
  keyName: string,
  defaultValue: UserDataType | null
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // The state variable that holds the current value stored in local storage.
      // It is initially set using a callback function passed to useState.
      // The callback retrieves the value from local storage using
      // window.localStorage.getItem(keyName).
      // If a value exists, it is parsed from JSON format.
      // If no value is found, the default value is stored in local storage,
      // and the default value itself is returned.
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: UserDataType | null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
