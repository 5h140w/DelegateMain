import React, { useState, useEffect } from 'react'
import loader from '../loader.svg'
import { unwrap, getWnatBalance } from './../logic/web3'
import AppState from '../AppState'
import Typography from '@mui/material/Typography'

function Unwrap() {
  const [appState, setAppState] = useState({ loading: false })
  const [balance, setBalance] = useState(0)

  const context = React.useContext(AppState)

  useEffect(() => {
    async function getBalance() {
      setAppState({ loading: true })
      const b = await getWnatBalance()
      setBalance(b)
      setAppState({ loading: false })
    }
    getBalance()
  }, [])

  async function unwrapTx() {
    if (!document.getElementById("unwrap__amount").value) return
    setAppState({ loading: true })
    const result = await unwrap(
      document.getElementById("unwrap__amount").value
    ).catch((e) => {
      return e
    })
    const b = await getWnatBalance()
    setBalance(b)
    context.reset()
    setAppState({ loading: false, result })
  }

  function setMax() {
    if (balance <= 0) return;
    document.getElementById("unwrap__amount").value =
      document.getElementById("unwrap__amount").max
  }

  return appState.loading ? (
    <img src={loader} alt="loading" className="body__loader" />
  ) : !appState.result ? (
    <>
      <Typography variant='h2'>Unwrap</Typography>
      <div className="input__container">
        <input
          type="number"
          className="body__input"
          placeholder={
            balance > 0 ? "Available: " + balance : "You don't have any wSGB"
          }
          id="unwrap__amount"
          min="0"
          max={balance}
        />
        <button
          className="input__max"
          style={{
            color: balance > 0 ? "var(--blue)" : "transparent",
            cursor: balance > 0 ? "pointer" : "text",
          }}
          onClick={setMax}
        >
          MAX
        </button>
      </div>
      <button
        className="body__button"
        onClick={unwrapTx}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <span>Unwrap</span>
      </button>
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
        className="body__button"
        onClick={() => setAppState({ loading: false })}
      >
        Try again
      </button>
    </>
  ) : (
    <>
      <Typography variant='h2'>Success</Typography>
      <button
        className="body__button"
        onClick={() => setAppState({ loading: false })}
      >
        Done
      </button>
    </>
  );
}

export default Unwrap;
