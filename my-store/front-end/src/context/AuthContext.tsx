import React, { createContext, ReactNode, useState, useEffect } from "react";
import api from "@/pages/api/api";
import { setCookie, parseCookies } from "nookies";

type User = {
  email: string;
};

type SignCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentiols: SignCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "store.token": token } = parseCookies();

    if (token) {
      // pegar dados de acesso do user
      // logout automatico
    }
  }, []);

  async function signIn({ email, password }: SignCredentials) {
    try {
      const response = await api.post("/authenticate", {
        email,
        password,
      });

      const { token, refreshToken } = response.data;

      setCookie(undefined, "store.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setCookie(undefined, "store.token", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ email });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
