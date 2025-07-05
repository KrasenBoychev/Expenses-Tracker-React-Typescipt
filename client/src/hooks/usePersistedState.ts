import { useState } from 'react';
import type { AuthDataInterface } from '../interfaces/authentication';

export default function usePersistedState(key: string, initialState: {}) {
  const [state, setState] = useState(() => {
    const persistedAuth = localStorage.getItem(key);

    if (!persistedAuth) {
      return typeof initialState === 'function' ? initialState() : initialState;
    }

    const authData = JSON.parse(persistedAuth);

    return authData;
  });

  const updateState = (value: Function | AuthDataInterface) => {
    const newState = typeof value === 'function' ? value(state) : value;

    if (newState === null || newState === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newState));
    }

    setState(newState);
  };

  return [state, updateState];
}
