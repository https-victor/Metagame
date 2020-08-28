import React, { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
    user: null,
    loggedIn: false,
    token: null
};

export const AuthContext = createContext<any>(initialState);

export const AuthProvider: any = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        // const storageToken = localStorage.getItem('auth-token');
        // if(storageToken){

        // }
    }, [])

    return (<AuthContext.Provider value={{
        loggedIn: true
    }}>
        {children}

    </AuthContext.Provider>);
};
