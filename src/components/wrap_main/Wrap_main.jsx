import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import AppState from '../../AppState'
import { getSigner, wrap } from '../../logic/web3'
import "./wrap_main.css"

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
              onClick={setMax}
            > 
              Max
            </button>
          </div>
          <button className='wrap_btn'>Wrap</button>
        </div>
    )
}

export default Wrap_main