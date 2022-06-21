import React, { useState, useEffect } from 'react'

import AppState from './AppState'
import './App.css'
import Navbar from './components/navbar/Navbar';
import SideBar from './components/sidebar/Sidebar';

function App() {
  const context = React.useContext(AppState)
  return (
    <div className="app">
      <Navbar></Navbar>
      <div style={{display:"flex", alignItems:"center"}}>
        <SideBar></SideBar>
        <h1>ok</h1>  
      </div>
      
    </div>
  )
}

export default App
