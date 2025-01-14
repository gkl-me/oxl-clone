import React, { createContext, useContext, useState } from "react";

interface loadingContextType {
    loading:boolean,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<loadingContextType|null>(null)


export const LoadingProvider = ({children}:{children:React.ReactNode}) => {

    const [loading,setLoading] = useState(false);

   return (
    <LoadingContext.Provider value={{loading,setLoading}}>
    {children}
</LoadingContext.Provider>
   )
}

export const useLoading = () =>{
    return useContext(LoadingContext)
}