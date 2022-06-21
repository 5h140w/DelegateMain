import React from 'react'
import AppState from '../../AppState'
import "./welcome.css"

const Welcome = () =>{
    const context = React.useContext(AppState)
    const connect = context.connect
    console.log(context)
    return(
        <div className='welcome_container'>
            <div className='welcome_section'>  
                <h1>Lena Instruments</h1>
                <h2>Flare Network Delegation Service</h2>
                <button onClick={connect}>{context.msg}</button>
            </div>
        </div>
    )
}

export default Welcome