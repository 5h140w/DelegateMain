import React, { useState, useEffect } from 'react'

import AppState from './AppState'
import './App.css'
import Welcome from './components/welcome/Welcome';
import { Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import Wrap from './pages/Wrap';
import Unwrap from './pages/Unwrap';


function App() {
  const context = React.useContext(AppState)
  const connected = context.connected
  
  return (
    <div className='app'>
      <Router>
    {
      connected ? (
          <Switch>
            <Route path="/SGB/wrap" component={Wrap}/>
            <Route path="/SGB/unwrap" component={Unwrap}/>
            <Route>
              <Redirect to="/SGB/wrap"/>
            </Route>
          </Switch>
        ) : (
          <Welcome/>
      )
    }
      </Router>
    </div>
    
  )
}

export default App
