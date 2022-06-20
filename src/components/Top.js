import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import AppState from '../AppState'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

function MenuTop() {
  const history = useHistory();
  const loc = useLocation();
  const x = getLastItem(loc.pathname) || "delegations"
  const [value, setValue] = React.useState(x); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newUrl = "/SGB/" + newValue
    history.push(newUrl)
  };
 
  return (
    <Grid container
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: '20px' }}
    >
      <div className="header__logotext">
        Lena Instruments
      </div>
      <div className="header__nav">
        <div onClick={(e)=>handleChange(e,"wrap")} className="header__navlink">
          Wrap
        </div>
        <div onClick={(e)=>handleChange(e,"delegate")} className="header__navlink">
          Delegate
        </div>
        <div onClick={(e)=>handleChange(e,"unwrap")} className="header__navlink">
          Unwrap
        </div>
        <div onClick={(e)=>handleChange(e,"delegations")} className="header__navlink">
          Delegations
        </div>
      </div>
    </Grid>
  );
}

function Top() {
  const context = React.useContext(AppState)
  return (
    <header className="header" id="header">
      <div className="header__container">
        <Grid container
          style={{padding:'15px 0 25px 0',background:'#FFF'}}
        >
          <MenuTop />
        </Grid>
      </div>
    </header>
  )
}

export default Top
