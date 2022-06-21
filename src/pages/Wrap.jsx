import React from 'react'
import Navbar from '../components/navbar/Navbar'
import SideBar from '../components/sidebar/Sidebar'
import Wrap_main from "../components/wrap_main/Wrap_main"

const Wrap = () =>{
    return(
        <>
            <Navbar/>
            <div className='main'>
                <div className='left_section'>
                    <SideBar/>
                </div>
                <div className='right_section'>
                    <Wrap_main/>
                </div>
            </div>
        </>
    )
}

export default Wrap