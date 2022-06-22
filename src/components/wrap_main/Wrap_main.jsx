import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import AppState from '../../AppState'
import { getSigner, wrap } from '../../logic/web3'
import "./wrap_main.css"
import loader from "../../loader.svg"
import { NavLink } from 'react-router-dom'

const Wrap_main = () =>{
    const context = useContext(AppState)
    const [appState, setAppState] = useState({loading: false})
    const [balance, setbalance] = useState(0)

    useEffect(
      ()=>{
        const getBalance= async () =>{
          setAppState({loading:true})
          const balance = parseFloat( ethers.utils.formatUnits(await getSigner().getBalance() , 18))
          setbalance(balance)
          setAppState({loading: false})
        }
        getBalance()
      },[]
    )

    const WrapTx = async()=>{
      const wrap_amount = document.getElementById("wrap_amount").value
      if (!wrap_amount || parseFloat(wrap_amount) <= 0) return;
      setAppState({loading: true})
      const result = await wrap( wrap_amount)
                .catch((e)=>{
                  return e
                })
      context.reset()
      setAppState({loading: false, result})          
    }  

    const setMax = ()=>{
      if(balance<= 0.5) return;
      document.getElementById("wrap_amount").value = document.getElementById("wrap_amount").max
    }

    return(
        <div className='wrap_section'>
          {
            appState.loading ? 
              (
                <div className='loading_section'>
                  <img alt="loading" src={loader}/>
                </div>
              )
              : !appState.result ?
              ( <>
                  <h1> Wrap</h1>
                  <div className='input_section'>
                    <input 
                      type="number" 
                      placeholder="Wrap your SGB"
                      id="wrap_amount"
                      min={0}
                      max={balance-0.5}
                    />
                    <button
                      className={balance< 0.5 ? "" : "none"}
                      onClick={setMax}> 
                      Max
                    </button>
                  </div>
                  <button className='wrap_btn' onClick={WrapTx}>Wrap</button>
                </>  
                ) : appState.result.code ?(
                  <div className='error_section'>
                    <h1>Error</h1>
                    <p>{appState.result.data
                          ? appState.result.data.message || appState.result.message
                          : appState.result.message}
                    </p>
                    <button
                      className="wrap_btn"
                      onClick={() => setAppState({ loading: false })}
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className='success_section'>
                    <h1>Success</h1>
                    <p>You successfully wrap your token ! </p>
                    <NavLink className="wrap_btn" to="/SGB/delegate">Go to delegate</NavLink>
                  </div>
                )
          }
        </div>
    )
}

export default Wrap_main