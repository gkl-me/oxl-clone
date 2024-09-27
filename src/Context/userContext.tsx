import React from "react";
import { createContext, useState } from "react";

interface UserType {
    name:string|null,
    email:string|null,
    uid:string
}

interface UserContextType {
    user:UserType|null|undefined,
    setUser: React.Dispatch<React.SetStateAction<UserType | null |undefined>>;
}

export const AuthContext = createContext<UserContextType|null>(null)

const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const [user,setUser] = useState<UserType|null|undefined>(null);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;
