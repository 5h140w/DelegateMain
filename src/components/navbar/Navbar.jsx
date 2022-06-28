import "./navbar.css"
import React ,{useState} from 'react'


const Navbar = () =>{
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () =>{
        setIsOpen(!isOpen)
    }
    return(
        <nav className={isOpen ? "navbar open" :"navbar"}>
            <div className="right_section">
                <h1 className="logo_navbar">Lena Instruments</h1>
                <button className="toggle_button" onClick={handleClick}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <ul className="menu_navbar">
                <li>
                    <a href="/SGB/wrap">Wrap</a>
                    <p className="numberSpan">1</p>
                </li>
                <li>
                    <a href="/SGB/delegate">Delegate</a>
                    <p className="numberSpan">2</p>
                </li>
                <li>
                    <a href="/SGB/unwrap">Unwrap</a>
                    <p className="numberSpan">3</p>
                </li>
                <li>
                    <a href="/SGB/delegations">Your Delegations</a>
                    <p className="numberSpan">4</p>
                </li>
            </ul>
            <button className="btn_navbar">Logout</button>
        </nav>
    )
}

export default Navbar