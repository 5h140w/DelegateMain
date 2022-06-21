import React, { useState, useEffect } from 'react'

import AppState from './AppState'
import './App.css'
import Navbar from './components/navbar/Navbar';
import SideBar from './components/sidebar/Sidebar';
import Wrap_main from './components/wrap_main/Wrap_main';
import Unwrap_main from './components/unwrap_main/Unwrap_main';

function App() {
  const context = React.useContext(AppState)
  return (
    <div className="app">
      <Navbar></Navbar>
      <div style={{display:"flex"}}>
        <div style={{flex:1}}>
          <SideBar></SideBar>
        </div>
        <div style={{flex:3, position:"relative"}}>
          <Unwrap_main></Unwrap_main>
        </div>
      </div>
      
    </div>
  )
}

export default App
