import React, { createContext, useReducer } from "react";
// import light from "../../styles/themes/light";
// import dark from "../../styles/themes/dark";
import GlobalReducer from "./GlobalReducer";
// import usePersistentState from "../../utils/usePersistentState";
// import { ThemeProvider } from "styled-components";
import { CLEAR_ERRORS, SET_ERRORS, SET_ERROR } from "./actions";

const initialState = { errors: [] };

export const GlobalContext = createContext<any>(initialState);

export const GlobalProvider: any = ({ children }: any) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // // Theme state
  // const [theme, setTheme] = usePersistentState('theme', light);
  // const toggleTheme = () => {
  //   setTheme(theme.title === 'light' ? dark : light);
  // }

  function setError(error: any) {
    dispatch({ type: SET_ERROR, payload: error })
  }

  function setErrorS(errors: any) {
    dispatch({ type: SET_ERRORS, payload: errors })
  }

  function clearError() {
    dispatch({ type: CLEAR_ERRORS })
  }

  return (<GlobalContext.Provider value={{
    // toggleTheme,
    errors: state.errors,
    setError,
    clearError
  }}>
    {/* <ThemeProvider theme={theme}> */}
    {children}
    {/* </ThemeProvider> */}

  </GlobalContext.Provider>);
};
