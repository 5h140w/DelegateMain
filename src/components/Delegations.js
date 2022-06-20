import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getDelegations, undelegate, getWnatBalance } from '../logic/web3'
import Delegation from './Delegation.js'
import Typography from '@mui/material/Typography'
import loader from '../loader.svg'

function Delegations() {
  const [ appState, setAppState ] = useState({ loading: true, delegations: [] })
  const [ balance, setBalance ] = useState(0)

  useEffect(() => {
    async function getAppState() {
      setAppState({ loading: true, delegations: [] });
      const delegations = await getDelegations();
      const b = await getWnatBalance();
      setBalance(b);
      setAppState({ loading: false, delegations });
    }
    getAppState();
  }, []);

  async function updateAppState() {
    setAppState({ loading: true, delegations: [] });
    const delegations = await getDelegations();
    setAppState({ loading: false, delegations });
  }

  async function undelegateTx(from) {
    setAppState({ loading: true, delegations: [] });
    const result = await undelegate(from).catch((e) => {
      return e;
    });

    setAppState({ loading: false, result });
  }

  return appState.loading ? (
    <img src={loader} alt="loading" className="body__loader" />
  ) : !appState.result ? (
    <>
      <Typography variant='h2'> 
        Your delegations
      </Typography>
      {appState.delegations.length > 0 ? (
        <>
          {appState.delegations.map((e, i) => (
            <Delegation
              key={i}
              address={e.address}
              amount={e.amount}
              balance={balance}
              tx={() => {
                undelegateTx(e.address);
              }}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="body__balance__txt" style={{ fontWeight:"200", fontSize:"300%", paddingBottom:"1rem", textAlign:"center" }}>
            You don't have any delegation
          </h2>
          <NavLink
            className="body__button"
            to="/SGB/delegate"
            style={{ marginTop: "1rem" }}
          >
            Delegate to Lena Instruments 
          </NavLink>
        </>
      )}
    </>
  ) : appState.result.code ? (
    <>
      <Typography variant='h2'>Error</Typography>
      <button className="body__button__completed" onClick={updateAppState}>
        Try again
      </button>
    </>
  ) : (
    <>
      <Typography variant='h2'>Success</Typography>
      <button className="body__button__completed" onClick={updateAppState}>
        Done
      </button>
    </>
  );
}

export default Delegations
