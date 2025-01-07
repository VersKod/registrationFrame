import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'


function Layout({user, logoutHandler}) {
  return (
   <>
   <HeaderComponent user={user} logoutHandler={logoutHandler}/>
   <Outlet/>
   <FooterComponent/>
  </>
  )
}

export default Layout