import React from 'react'
import Navbar from '../components/navbar/Navbar'
import SideBar from '../components/sidebar/Sidebar'
import Unwrap_main from "../components/unwrap_main/Unwrap_main"

const Unwrap = () =>{
    return(
        <>
            <Navbar/>
            <div className='main'>
                <div className='left_section'>
                    <SideBar/>
                </div>
                <div className='right_section'>
                    <Unwrap_main/>
                </div>
            </div>
        </>
    )
}

export default Unwrap