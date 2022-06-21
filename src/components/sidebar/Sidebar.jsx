import React from 'react'
import "./sidebar.css"
import WSGBICON from "../../assets/WSGB.png"
import SGBICON from "../../assets/SGB.png"

const SideBar = () =>{
    return (
        <div className='sidebar_container'>
            <h1 className='title'>Your wallet</h1>
            <div className='wallet_content'>
                <div className="address_section">
                    <span className="subtitle">ADDRESS</span>
                    <div className="addressContent">
                        <p>0x23AE516493CD4D83128c1923098fbA112a63fb64</p>
                        <button className='copy_address'>
                            <i className="far fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='coin_section'>
                <h1 className="subtitle">COINS</h1>
                <div className="songBird">
                    <img src={WSGBICON} alt="" />
                    <span className="sonbirgName">SongBird</span>
                    <span className="value">122</span>
                    <span className="sbg">SGB</span>
                </div>
                <div className="WsongBird">
                    <img src={SGBICON} alt="" />
                    <span className="WsonbirgName">SongBird</span>
                    <span className="Wvalue">122</span>
                    <span className="Wsbg">WSGB</span>
                </div>
            </div>
            <div className='statistics_section'>
                <h1 className="subtitle">STATISTICS</h1>
                <div className='statistics_content'>
                    <p className="labelInput">Address for receive reward :</p>
                    <input className="inputtext" type="text" placeholder="Address for receive reward " />
                    <div className='unclaimed_rewards'>
                        <p>Unclaimed Rewards</p>
                        <p> 0 SGB</p>
                    </div>
                    <div className='pending_rewards'>
                        <p>Pending Rewards</p>
                        <p> 122 WSGB</p>
                    </div>
                </div>
            </div>
            <button className="claim_btn">Claim Rwards</button>
        </div>
    )
}

export default SideBar