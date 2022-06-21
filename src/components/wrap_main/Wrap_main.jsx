import React from 'react'
import "./wrap_main.css"

const Wrap_main = () =>{
    return(
        <div className='wrap_section'>
          <h1> Wrap</h1>
          <div className='input_section'>
            <input type="text" placeholder="Wrap your SGB"/>
          </div>
          <button className='wrap_btn'>Wrap</button>
        </div>
    )
}

export default Wrap_main