import React, {useEffect , useState }from 'react'
import "./delegation_main.css"
import { getWnatBalance , getDelegations , undelegate } from '../../logic/web3'
import loader from "../../loader.svg"
import { NavLink } from 'react-router-dom'
import Delegation from '../delegation/Delegation'

const Delegation_main = () =>{
    const [appState, setAppState] = useState({loading: true, delegations:[]})
    const [balance, setBalance] = useState(0)

    useEffect(
        ()=>{
            const getInfo = async () =>{
                const delegations = await getDelegations()     
                const balance = await getWnatBalance()
                setBalance(balance)
                setAppState({loading: false , delegations})
            }
            getInfo()
        },[]
    )

    const UpdateAppState = async ()=>{
        setAppState({loading: true, delegations:[]})
        const delegations = await getDelegations()
        setAppState({loading : false, delegations})
    }


    const UndelegateTx = async(from) =>{
        setAppState({loading:true , delegations:[]})
        const result = await undelegate(from).catch(
            (e)=> {return e}
        )
        setAppState({loading: false , result})
    }
    return(
        <div className={appState.delegations.length >0 ? "delegation_section list" : 'delegation_section'}>
            {
                appState.loading ? (
                    <div className='loading_section'>
                        <img alt="loading" src={loader}/>
                    </div>
                ) : !appState.result ?(
                    <>
                        <h1>Your Delegations</h1>
                        {
                            appState.delegations.length>0 ?(
                                <>
                                    {
                                        appState.delegations.map(
                                            (delegation,index) =>{
                                                return (
                                                    <Delegation
                                                        key={index}
                                                        delegation={delegation}
                                                        undelegate={UndelegateTx}
                                                    />
                                                )
                                            }
                                        )
                                    }
                                </>
                            ):(
                                <>
                                    <h2>You don't have any delegation</h2>
                                    <NavLink to="/SGB/delegate"> Delegate to Lena Instruments</NavLink>
                                </>
                            )
                        }
                    </>
                ): appState.result.code ?(
                    <>
                        <h2>Error</h2>
                        <button onClick={UpdateAppState}> Try Again</button>
                    </>
                ) :(
                    <>
                        <h2>Success</h2>
                        <p>You successfully undelegate the token</p>
                        <NavLink tp="/SGB/delegation"> GO back to delegations page</NavLink>
                    </>
                )
            }
        </div>
    )
}

export default Delegation_main