import React,{ useContext, useEffect, useState } from 'react'
import "./unwrap_main.css"
import AppState from '../../AppState'
import { getWnatBalance, unwrap } from '../../logic/web3'
import loader from "../../loader.svg"
import Logo from "../../logo.svg"
import { NavLink } from 'react-router-dom'

const Unwrap_main = () =>{

    const context = useContext(AppState)
    const [balance , setBalance] = useState(0)
    const [appState, setAppState] = useState({loading:false})

    useEffect(
      ()=>{
          const getBalance = async () =>{
            setAppState({loading:true})
            const balance = await getWnatBalance()
            setBalance(balance)
            setAppState({loading : false})
          }
          getBalance()
      },[]
    )

      const UnwrapTx = async ()=>{
        const unwrap_amount = document.getElementById("unwrap_amount").value
        if(!unwrap_amount) return 
        setAppState({loading: true})
        const result = await unwrap(unwrap_amount).catch(
          (e) =>{
            return e
          }
        )
        const balance = await getWnatBalance()
        setBalance(balance)
        context.reset()
        setAppState({loading: false , result})
      }
    
    const setMax = () =>{
      if (balance <=0) return
      document.getElementById("unwrap_amount").value =document.getElementById("unwrap_amount").max
    }

    return(
      <div className='unwrap_section'>
        {
          appState.loading ? (
            <div className='loading_section'>
              <img alt="loading" src={loader} className="load"/>
              <img alt="logo" src={Logo} className="logo"/>
            </div>
          ): !appState.result ?(
            <>
              <h1> Unwrap</h1>
              <div className='input_section'>
              <input 
                type="number" 
                placeholder="Unwrap your SGB"
                id="unwrap_amount"
                min={0}
                max={balance}
              />
              <button
                className={balance> 0 ? "" : "none"}
                onClick={setMax}> 
                Max
              </button>
              </div>
              <button className='unwrap_btn' onClick={UnwrapTx}>UnWrap</button>
            </>      
          ) : appState.result.code ?(
            <div className='error_section'>
              <h1>Error</h1>
              <p>
                {
                  (appState.result.code ===4001) ? appState.result.message : "You attempted to unwrap more than your current WSGB balance, try to unwrap less"
                }
              </p>
              <button
                className="unwrap_btn"
                onClick={() => setAppState({ loading: false })}
              >
                Try again
              </button>
            </div>
          ) :(
            <div className='success_section'>
              <h1>Success</h1>
              <p>You successfully unwrapped your tokens ! </p>
              <NavLink
                className="unwrap_btn"
                to="/SGB/wrap"
              >
                Go to wrap
              </NavLink>
            </div>
          )
        }
      </div>
    )
}

export default Unwrap_main