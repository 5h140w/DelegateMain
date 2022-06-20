import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import AppState from './AppState'
import Wrap from './components/Wrap'
import Unwrap from './components/Unwrap'
import Delegate from './components/Delegate'
import Delegations from './components/Delegations'
import Top from './components/Top'
import Informer from './components/Informer'
import Welcome from './components/Welcome'
import Typography from '@mui/material/Typography'
import './App.css'

function App() {
  const context = React.useContext(AppState)
  return (
    <div className="app">
      <Router>
        {context.connected ? <Top /> : ''}
        {context.connected ? <Informer /> : ''}
        <section className="body">
              {
                context.connected ?
          <div className="body__container">
            <div className="body__wrap">
                  <Switch>
                    <Route path="/SGB/wrap" component={Wrap} />
                    <Route path="/SGB/unwrap" component={Unwrap} />
                    <Route path="/SGB/delegate" component={Delegate} />
                    <Route path="/SGB/delegations" component={Delegations} />
                    <Route>
                      <Redirect to="/SGB/wrap" />
                    </Route>
                  </Switch> 
            </div>
          </div>:
                  <Welcome />
              }
        </section>
      </Router>
    </div>
  )
}

export default App
