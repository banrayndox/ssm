import { createContext, useEffect, useReducer, useState } from "react";
import { appReducer } from "./AppReducer";
import api from '../helper/api.js'
export const AppContext = createContext()


const ContextProvider = ({children}) => {
    const initialState = {
    user: null,
    isLogged: false,
     loading: true,
    }
    const [state, dispatch] = useReducer(appReducer, initialState)


  const isAuth = async () => {
    try {
      const response = await api.get('/auth/get-authenticated');
      if (response.data.success && response.data.user) {
        dispatch({ type: "LOGIN", payload: response.data.user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      await api.get('/auth/logout');
      dispatch({ type: "LOGOUT" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // done checking
    }
  };
   useEffect(()=>{
     isAuth()
   },[])

    return(
        <AppContext.Provider value={{state, dispatch}}>
        {children}
        </AppContext.Provider>
    )
}

export default ContextProvider