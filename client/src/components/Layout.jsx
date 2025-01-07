import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'


function Layout({user}) {
  return (
   <>
   <HeaderComponent user={user}/>
   <Outlet/>
   <FooterComponent/>
  </>
  )
}

export default Layout