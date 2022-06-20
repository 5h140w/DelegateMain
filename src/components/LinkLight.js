import React, { useState, useEffect } from 'react'
import { getProvider } from "../logic/web3";
import Typography from '@mui/material/Typography';
//import './Footer.css'

//import twitter from './twitter.svg'
//import scandinodes from './scandinodes.svg'

const delay = ms => new Promise(res => setTimeout(res, ms))

function LinkLight() {
  const [block, setBlock] = useState('Disconnected')

  useEffect(() => {

    async function updateBlock() {
      while(typeof getProvider() === "undefined") await delay(300)

      while (true){
        const n = await getProvider().getBlockNumber()

        setBlock(n)
        await delay(20000)
      }
    }

    updateBlock()
  }, [])

  return (
    <div className="footer_text">
      <div className={"footer__status " + (block === "Disconnected" ? "disconnected" : "")}></div>
      <Typography variant='linklight'>
      Songbird <span style={{color:'#444',padding:'0 5px'}}>Total blocks: </span><b>{ block }</b>
      </Typography>
    </div>
  );
}

export default LinkLight 
