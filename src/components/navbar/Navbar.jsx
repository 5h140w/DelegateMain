import "./navbar.css"
import React from 'react'


const Navbar = () =>{
    return(
        <nav className="navbar">
            <h1 className="logo_navbar">Lena Instruments</h1>
            <ul className="menu_navbar">
                <li>
                    <a href="">Wrap</a>
                </li>
                <li>
                    <a href="">Delegate</a>
                </li>
                <li>
                    <a href="">Unwrap</a>
                </li>
                <li>
                    <a href="">Your Delegations</a>
                </li>
            </ul>
            <button className="btn_navbar">Logout</button>
        </nav>
    )
}

export default Navbar