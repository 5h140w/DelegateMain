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
            (e)=> {
                console.log(e)
                return e
            }
        )

        console.log(result)

        setAppState({loading: false , delegations:[],result})
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
                        <h1 className='delegation_title'>Your Delegations</h1>
                        {
                            appState.delegations.length>0 ?(
                                <>
                                    {
                                        appState.delegations.map(
                                            (delegation,index) =>{
                                                return (
                                                    <>
                                                        <Delegation
                                                            key={index}
                                                            balance ={balance}
                                                            delegation={delegation}
                                                            undelegate={UndelegateTx}
                                                        />
                                                    </>
                                            
                                                )
                                            }
                                        )
                                    }
                                </>
                            ):(
                                <>
                                    <h2>You don't have any delegation</h2>
                                    <NavLink 
                                        className="redirect_btn"
                                        to="/SGB/delegate"
                                    > 
                                        Delegate to Lena Instruments
                                    </NavLink>
                                </>
                            )
                        }
                    </>
                ): appState.result.code ?(
                    <div className='error_section'>
                        <h1>Error</h1>
                        <p>{appState.result.message}</p>
                        <button 
                            onClick={UpdateAppState}
                            className="redirect_btn"
                        > 
                            Try Again
                        </button>
                    </div>
                ) :(
                    <div className='success_section'>
                        <h1>Success</h1>
                        <h2>You successfully undelegate the token</h2>
                        <NavLink className="redirect_btn" to="/SGB/delegation"> GO back to delegations page</NavLink>
                    </div>
                )
            }
        </div>
    )
}

export default Delegation_main