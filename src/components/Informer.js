import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ExploreIcon from '@mui/icons-material/Explore';

import AppState from '../AppState'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';

function Informer() {
  const context = React.useContext(AppState)

  const connected = context.connected
  const address = context.address
  const sgbBalance = context.sgbBalance.toFixed(6)
  const wsgbBalance = context.wsgbBalance
  const claimable = context.claimable
  const unclaimable = context.unclaimable
  const msg = context.msg

  const [ rewardAddress, setRewardAddress ] = React.useState(address)

  const claimTx = () => {
    const addressLength = rewardAddress.length
    if (addressLength === 42) {
      context.claimTx(rewardAddress)
    } else {
      alert("Bad address for receive reward")
    }
  }

  const fAddress = address.substring(0, 10) + "..." + address.substring(34)

  const explorerAddr = 'https://songbird-explorer.flare.network/address/' + address

  return(
    <div className='informer'>
      <div className='informer__wrap'>
        <div className='header__logotext'>
          Your wallet
        </div>
        <div className='informer__textdescr'>
          ADDRESS
        </div>
        <div className='informer__str'>
          <div className='informer__textvalue'>
            {fAddress}
          </div>
          <ExploreIcon
            style={{position:'absolute',right:'30px',cursor:'pointer',width:'42px',height:'42px'}}
            onClick = {()=> window.open(explorerAddr, "_blank")}
          />
        </div>
        <div className='informer__textdescr'>
          COINS
        </div>
        <div className='informer__str'>
          <div className='informer__logo icon-sgb' />
          <div className='informer__textname'>
            Songbird
          </div>
          <div className='informer__textvalue'>
            {sgbBalance} SGB
          </div>
        </div>
        <div className='informer__str'>
          <div className='informer__logo icon-wsgb' />
          <div className='informer__textname'>
            Wrapped Songbird
          </div>
          <div className='informer__textvalue'>
            {wsgbBalance} WSGB
          </div>
        </div>
        <div className='informer__textdescr'>
          STATISTICS
        </div>
        <div className='informer__str'>
          <div className='informer__textname'>
            Address for receive reward:
          </div>
        </div>
        <div className='informer__str'>
          <input
            value={rewardAddress}
            onChange={(e)=>setRewardAddress(e.target.value)}
            className='informer__input'
          />
        </div>
        <div className='informer__str'>
          <div className='informer__textname'>
            Unclaimed Rewards
          </div>
          <div className='informer__textvalue'>
            {claimable} SGB
          </div>
        </div>
        <div className='informer__str'>
          <div className='informer__textname'>
            Pending Rewards
          </div>
          <div className='informer__textvalue'>
            {unclaimable} SGB 
          </div>
        </div>
        {claimable > 0  || unclaimable > 0 ? <button
          className="body__button"
          onClick={claimTx}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          Claim Rewards
        </button> : ''}
      </div>
    </div>
  )
}

export default Informer
