import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import AppState from '../AppState'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';

function Welcome() {
  const context = React.useContext(AppState)
  const connect = context.connect

  return(
    <div className='welcome'>
      <div className='welcome__wrap'>
        <center>
          <h1>Lena Instruments</h1>
          <h2>
            Flare Network Delegation Service
          </h2>
          <button
            className="body__button"
            onClick={connect}
          >
            {context.msg}
          </button>
        </center> 
      </div>
    </div>
  )
}

export default Welcome 
