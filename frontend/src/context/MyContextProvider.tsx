// MyContextProvider.tsx
import React, { ReactNode, useState } from "react";
import MyContext from "./MyContext";

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>("");

  const setTokenValue = (newToken: string) => {
    setToken(newToken);
  };

  const clearTokenValue = () => {
    setToken(null);
  };

  return (
    <MyContext.Provider value={{ token, setTokenValue, clearTokenValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
