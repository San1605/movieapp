import { createContext, useState, ReactNode } from "react";

interface GlobalContextProps {
  query: string;
  setQuery: (query: string) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  query: "",
  setQuery: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  return (
    <GlobalContext.Provider value={{ query, setQuery }}>
      {children}
    </GlobalContext.Provider>
  );
};