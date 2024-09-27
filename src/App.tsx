import React, { useContext, useEffect } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import { AuthContext } from './Context/userContext'
import {auth} from '../src/Firebase/firebase'
import CreatePage from './Pages/CreatePage'
import ViewPost from './Pages/ViewPost'
import PostProvider from './Context/postContext'
import { LoadingProvider } from './Context/loadingContext'


const App:React.FC = () => {

  const authContext = useContext(AuthContext)
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if(user && authContext){
        authContext?.setUser({
          name:user?.displayName,
          email:user?.email,
          uid:user?.uid
        })
      }
    })
    console.log(authContext?.user)
  },[])

  return (
    <LoadingProvider>
    <PostProvider>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/create' element={<CreatePage/>} />
      <Route path='/viewpost' element={<ViewPost/>} />
    </Routes>
    </PostProvider>
    </LoadingProvider>
  )
}

export default App