import "./navbar.css"
import React from 'react'


const Navbar = () =>{
    return(
        <nav className="navbar">
            <div className="right_section">
                <h1 className="logo_navbar">Lena Instruments</h1>
                <button className="toggle_button">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
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