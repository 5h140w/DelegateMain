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