import React, { useState, useEffect } from 'react'

import AppState from './AppState'
import './App.css'
import Navbar from './components/navbar/Navbar';

function App() {
  const context = React.useContext(AppState)
  return (
    <div className="app">
      <Navbar></Navbar>
      <h1>ok</h1>
    </div>
  )
}

export default App
