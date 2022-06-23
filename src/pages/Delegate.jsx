import React from 'react'
import Navbar from '../components/navbar/Navbar'
import SideBar from '../components/sidebar/Sidebar'
import Delegate_main from '../components/delegate_main/Delegate_main'

const Delegate = () =>{
    return(
        <>
            <Navbar/>
            <div className='main'>
                <div className='left_section'>
                    <SideBar/>
                </div>
                <div className='right_section'>
                    <Delegate_main/>
                </div>
            </div>
        </>
    )
}

export default Delegate