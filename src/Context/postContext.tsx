import React, { createContext, useState } from 'react'


interface postDetailsType{
    name: string;
    category: string;
    price: number;
    url: string;
    createdAt: string;
    uid: string;
}

interface postDetailsContextType {
    postDetails:postDetailsType|null;
    setPostDetails: React.Dispatch<React.SetStateAction<postDetailsType | null>>;
}

export const PostContext = createContext<postDetailsContextType|null>(null)

const PostProvider = ({children}:{children:React.ReactNode}) => {

    const [postDetails,setPostDetails] = useState<postDetailsType|null>(null);

  return (
    <PostContext.Provider value={{postDetails,setPostDetails}}>
        {children}
    </PostContext.Provider>
  )
}

export default PostProvider;