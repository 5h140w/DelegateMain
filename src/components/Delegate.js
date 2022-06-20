import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import {
  getWnatBalance,
  delegate,
  getAvailableDelegations,
  getLenaDelegations,
} from "./../logic/web3";
import loader from '../loader.svg'

function Delegate() {
  const [appState, setAppState] = useState({ loading: true, amount: 100 });
  const [delegation, setdelegation] = useState({
    balance: 0,
    available: 100,
    delegated: 0,
  });

  useEffect(() => {
    async function getAppState() {
      setAppState({ loading: true, amount: 100 });
      const balance = await getWnatBalance();
      const available = await getAvailableDelegations();
      const delegated = await getLenaDelegations();
      setdelegation({ balance, available, delegated });
      setAppState({ loading: false, amount: available });
    }
    getAppState();
  }, []);

  async function delegateTx() {
    setAppState({ loading: true });
    const result = await delegate(appState.amount).catch((e) => {
      return e;
    });
    setAppState({ loading: false, result });
  }

  return appState.loading ? (
    <img src={loader} alt="loading" className="body__loader" />
  ) : !appState.result ? (
    <>
      <Typography variant='h2'>Delegate</Typography>
      {delegation.balance > 0 ? (
        <>
          <Typography
            variant='number'
          >
            {appState.amount}%
          </Typography>
          <input
            type="range"
            id="delegate"
            name="delegate"
            min="0"
            max="100"
            step="1"
            defaultValue={appState.amount}
            style={{
              background: `linear-gradient(to right, var(--blue) 0%, var(--blue)  ${appState.amount}%, #7EC8E3 ${appState.amount}%, #7EC8E3 100%)`
            }}
            onChange={() => setAppState({ loading: false, amount: document.getElementById("delegate").value })}
          />
          {appState.amount > delegation.available ? (
            <>
              <h3 className="body__balance__txt" style={{ marginTop: "2.6rem" }}>
                You already have delegations in others FTSO.
                <br />
                Want to delegate more to Lena Instruments?
              </h3>
              <NavLink
                className="body__button"
                to="/SGB/delegations"
                style={{ marginTop: "1rem" }}
              >
                Undelegate from another FTSO
              </NavLink>
            </>
          ) : appState.amount <= delegation.delegated ? (
            <h3 className="body__balance__txt" style={{ marginTop: "2.6rem" }}>
              You are already delegating {delegation.delegated}% to Lena Instruments 
            </h3>
          ) : (
            <button
              className="body__button"
              onClick={delegateTx}
              style={{ padding: "1rem" }}
            >
              Delegate{" "}
              {(Math.round(delegation.balance * appState.amount) / 100).toFixed(
                2
              )}{" "}
              wSGB 
            </button>
          )}
        </>
      ) : (
        <>
          <p className="body__balance__txt" style={{ paddingTop: "2rem" }}>
            You don't have enough <span>wSGB</span>
          </p>
          <NavLink
            className="body__button"
            to="/SGB/wrap"
            style={{ marginTop: "1rem" }}
          >
            Wrap your <span>SGB</span>
          </NavLink>
        </>
      )}
    </>
  ) : appState.result.code ? (
    <>
      <Typography variant='h2'>Error</Typography>
      <p className="body__result__txt">
        {appState.result.data
          ? appState.result.data.message || appState.result.message
          : appState.result.message}
      </p>
      <button
        className="body__button__completed"
        onClick={() =>
          setAppState({ loading: false, amount: delegation.available })
        }
      >
        Try again
      </button>
    </>
  ) : (
    <>
      <Typography variant='h2'>Success</Typography>
      <button
        className="body__button"
        onClick={() =>
          setAppState({ loading: false, amount: delegation.available })
        }
      >
        Done
      </button>
    </>
  );
}

export default Delegate
