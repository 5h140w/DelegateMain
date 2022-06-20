import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { wrap, getSigner } from "./../logic/web3";
import AppState from '../AppState'
import Typography from '@mui/material/Typography'
import loader from "../loader.svg";

function Wrap() {
  const [appState, setAppState] = useState({ loading: false });
  const [balance, setBalance] = useState(0);

  const context = React.useContext(AppState)

  useEffect(() => {
    async function getBalance() {
      setAppState({ loading: true });
      const b = parseFloat(
        ethers.utils.formatUnits(await getSigner().getBalance(), 18)
      );
      setBalance(b);
      setAppState({ loading: false });
    }
    getBalance();
  }, []);

  async function wrapTx() {
    if (
      !document.getElementById("wrap__amount").value ||
      parseFloat(document.getElementById("wrap__amount").value) <= 0
    )
      return;
    setAppState({ loading: true });
    const result = await wrap(
      document.getElementById("wrap__amount").value
    ).catch((e) => {
      return e;
    });
    context.reset()
    setAppState({ loading: false, result });
  }

  /*
  function addToMetamask(){
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED',
          symbol: 'wSGB',
          decimals: 18,
          image: 'https://delegation.lena.tech/favicon.png',
        },
      },
    })
  }
  */

  function setMax() {
    if (balance <= 0.5) return;
    document.getElementById("wrap__amount").value = document.getElementById("wrap__amount").max
  }

  return appState.loading ? (
    <img src={loader} alt="loading" className="body__loader" />
  ) : !appState.result ? (
    <>
      <Typography variant='h2'>Wrap</Typography>
      <div className="input__container">
        <input
          type="number"
          className="body__input"
          placeholder={
            balance > 0.5
              ? "Amount: " + (balance - 0.5).toFixed(3)
              : "You don't have enough SGB"
          }
          id="wrap__amount"
          min="0"
          max={balance - 0.5}
        />
        <button
          className="input__max"
          style={{
            color: balance > 0.5 ? "var(--blue)" : "transparent",
            cursor: balance > 0.5 ? "pointer" : "text",
          }}
          onClick={setMax}
        >
          MAX
        </button>
      </div>

      <button
        className="body__button"
        onClick={wrapTx}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <span>Wrap</span>
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
      <NavLink to="/SGB/delegate" className="body__button">
        Go to Delegate
      </NavLink>
    </>
  );
}

export default Wrap;
