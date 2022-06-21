import React from 'react'
import "./unwrap_main.css"

const Unwrap_main = () =>{
    return(
        <div className='unwrap_section'>
          <h1> Unwrap</h1>
          <div className='input_section'>
            <input type="text" placeholder="Unwrap your SGB"/>
          </div>
          <button className='wrap_btn'>Unwrap</button>
        </div>
    )
}

export default Unwrap_main