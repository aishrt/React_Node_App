import React, { createContext, ReactNode, useState } from "react";

// Define Types of Context Variables & Functions
interface myContextProps {
  token: string | null;
  setTokenValue: (newToken: string) => void;
  clearTokenValue: () => void;
}

// Create Context
const MyContext = createContext<myContextProps | undefined>(undefined);

// Create Context Providers
const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>("");
  const setTokenValue = (newToken: string) => {
    setToken(newToken);
  };
  const clearTokenValue = () => {
    setToken(null);
    console.log("Kr diaya sab clear");
  };

  return (
    <MyContext.Provider value={{ token, setTokenValue, clearTokenValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
