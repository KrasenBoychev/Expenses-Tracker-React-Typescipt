import React, { createContext, useContext } from "react";

import usePersistedState from "../hooks/usePersistedState";
import type {
  AuthDataInterface,
  ContextDataInterface,
} from "../interfaces/authentication";

export const AuthContext = createContext<ContextDataInterface>({
  userId: "",
  email: "",
  accessToken: "",
  isAuthenticated: false,
  changeAuthState: (authState = {}) => null,
  logout: () => null,
});

export function AuthContextProvider(props: React.PropsWithChildren) {
  const [authState, setAuthState] = usePersistedState("auth", {});

  const changeAuthState = (state: AuthDataInterface) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState(null);
  };

  const contextData: ContextDataInterface = {
    userId: authState?.userId,
    email: authState?.email,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.email,
    changeAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authData = useContext(AuthContext);

  return authData;
}
