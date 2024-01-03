import { createContext } from "react";

interface MyContextProps {
  token: string | null;
  setTokenValue: (newToken: string) => void;
  clearTokenValue: () => void;
}
const MyContext = createContext<MyContextProps | undefined>(undefined);

export default MyContext;


//Use this in your file to access the context data
// import { useContext } from "react";
// import MyContext from "../context/MyContext";
// const tocken = useContext(MyContext);