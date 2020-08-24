import React, { createContext, useReducer } from "react";
import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import GlobalReducer from "./GlobalReducer";
import usePersistentState from "../utils/usePersistentState";
import { ThemeProvider } from "styled-components";

const initialState = { theme: 't12' };

export const GlobalContext = createContext<any>(initialState);

export const GlobalProvider: any = ({ children }: any) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // Theme state
  const [theme, setTheme] = usePersistentState('theme', light);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (<GlobalContext.Provider value={{
    theme: state.theme,
    toggleTheme
  }}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>

  </GlobalContext.Provider>);
};
