import React from 'react'

import Banner from '../Components/Banner/Banner'
import Posts from '../Components/Posts/Posts'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'



const Home:React.FC = () => {
  
  return (
    <div>
        <Header />
        <Banner />
        <Posts />
        <Footer />
    </div>
  )
}

export default Home