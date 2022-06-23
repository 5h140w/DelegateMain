import React from 'react'
import "./delegation.css"
import { knownFTSO } from '../../logic/web3'

const Delegation = (props) =>{
    return(
        <div className='delegation_container'>
            <h3>{knownFTSO[props.delegation.address.toLowerCase()] || props.delegation.address.substring(0, 6) + "..." + props.delegation.address.substring(36)}</h3>
            <p>{props.delegation.amount/100 + '%'}</p>
            <p>{(props.balance * (props.delegation.amount/10_000)).toFixed(0) + ' wSGB'}</p>
            <button
                className='undelegate_btn' 
                onClick={()=>{
                    props.undelegate(props.delegation.address)
            }}> 
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
        </div>
    )
}

export default Delegation