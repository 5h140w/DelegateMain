import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppState from '../../AppState'
import { delegate, getAvailableDelegations, getLenaDelegations, getWnatBalance } from '../../logic/web3'
import "./delegate_main.css"
import loader from "../../loader.svg"


const Delegate_main = () =>{
    const [appState, setAppState] = useState({loading:true, amount:100})
    const [delegation, setdelegation] = useState({
        balance: 0,
        available: 100,
        delegated: 0,
    });
    useEffect(
        ()=>{
            const getInfos = async () =>{
                const balance = await getWnatBalance()
                const available = await getAvailableDelegations()
                const delegated = await getLenaDelegations()
                setdelegation({balance,available,delegated})
                setAppState({loading:false , amount:available})
            }
            getInfos()
        },[]
    )

    const DelegateTx = async()=>{
        setAppState({loading:true})
        const result = await delegate(appState.amount).catch(
            (e)=>{
                console.log(e)
                return e
            }
        )
        setAppState({loading:false, result})
    }

    return(
        <div className='delegate_section'>
            {
                appState.loading ? (
                    <div className='loading_section'>
                        <img alt="loading" src={loader}/>
                    </div>
                ):!appState.result ?(
                    <>
                        <h1>Delegate</h1>
                        {
                            delegation.balance>0 ?(
                                <>
                                    <p>{appState.amount}</p>
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
                                        onChange={()=>{
                                            setAppState({loading:false, amount:document.getElementById("delegate").value})
                                        }}
                                    />
                                    {
                                        appState.amount > delegation.available ? (
                                            <> 
                                                <h3>You already have delegations in others FTSO</h3>
                                                <h1>Want to delegate more to Lena Instruments?</h1>
                                                <NavLink
                                                    to="/SGB/delegations"
                                                    className="delegate_btn"
                                                >
                                                    Undelegate from another FTSO
                                                </NavLink>
                                            </>
                                        ) : (
                                            <button
                                                onClick={DelegateTx}
                                                className="delegate_btn"
                                            >
                                                Delegate{" "}
                                                {(Math.round(delegation.balance * appState.amount) / 100).toFixed(
                                                    2
                                                )}{" "}
                                                wSGB 
                                            </button>
                                        )
                                    }                               
                                </>
                            ):(
                                <>
                                    <p>
                                        You don't have enough <span>wSGB</span>
                                    </p>
                                    <NavLink
                                        to="/SGB/wrap"
                                        className="delegate_btn"
                                    >
                                        Wrap your <span>SGB</span>
                                    </NavLink>
                                </>
                            )
                        }
                    </>
                ): appState.result.code ? (
                    <div className='error_section'>
                        <h1>Error</h1>
                        <p>{appState.result.message}</p>
                        <button
                            className="delegate_btn"
                            onClick={() =>
                                setAppState({ loading: false, amount: delegation.available })
                            }
                        > 
                            Try again
                        </button>
                    </div>
                ):(
                    <div className='success_section'>
                        <h1>Success</h1>
                        <p>You successfully delegate your token</p>
                        <NavLink
                            className="delegate_btn"
                            to="/SGB/delegations"
                        >
                            Go to your delegations dashboard
                        </NavLink>
                    </div>
                )
            }
        </div>
    )
}

export default Delegate_main