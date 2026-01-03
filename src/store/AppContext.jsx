import { createContext, useEffect, useReducer, useState } from "react";
import { appReducer } from "./AppReducer";
import api from '../helper/api.js'
export const AppContext = createContext()


const ContextProvider = ({children}) => {
    const initialState = {
    user: null,
    isLogged: false
    }
    const [state, dispatch] = useReducer(appReducer, initialState)

    const isAuth = async() =>{
try {
    const response = await api.get('/auth/get-authenticated');
    
    // শুধু যদি response এ ইউজার ডাটা থাকে তবেই লগইন হবে
    if (response.data && response.data.user) {
      dispatch({ type: "LOGIN", payload: response.data.user });
    } else {
      // যদি ডাটা না থাকে (কুকি ক্লিয়ার থাকলেও অনেক সময় 200 আসে)
      dispatch({ type: "LOGOUT" });
    }
  }catch (error) {
       await api.get('/auth/logout')
        dispatch({type: "LOGOUT"})
     }
 
    }
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