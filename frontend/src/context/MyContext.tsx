import { createContext } from "react";

interface MyContextProps {
  token: string | null;
  setTokenValue: (newToken: string) => void;
  clearTokenValue: () => void;
}
const MyContext = createContext<MyContextProps | undefined>(undefined);

export default MyContext;
