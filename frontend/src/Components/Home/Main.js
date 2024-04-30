//importing react libraries from react in JS file
import React from 'react'
//Outlet is used to render the content of nested routes
import { Outlet} from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';

//Arrow function
const Main = () => {
  return (
    <div>
       <Header/>
       <Outlet/>  
       <Footer/>
    </div>
  )
}

export default Main