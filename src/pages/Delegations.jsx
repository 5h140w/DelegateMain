import React from 'react'
import Delegation_main from '../components/delegation_main/Delegation_main'
import Navbar from '../components/navbar/Navbar'
import SideBar from '../components/sidebar/Sidebar'

const Delegations = () =>{
    return(
        <>
        <Navbar/>
        <div className='main'>
            <div className='left_section'>
                <SideBar/>
            </div>
            <div className='right_section'>
                <Delegation_main/>
            </div>
        </div>
        </>
    )
}

export default Delegations