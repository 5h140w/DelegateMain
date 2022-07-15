import React, { useState } from 'react'
import "./sidebar.css"
import WSGBICON from "../../assets/WSGB.png"
import SGBICON from "../../assets/SGB.png"
import AppState from '../../AppState'
import CopyToClipboard from 'react-copy-to-clipboard'

const SideBar = () =>{
    const context = React.useContext(AppState)
    const address = context.address
    const sgbBalance = context.sgbBalance.toFixed(6)
    const wsgbBalance = context.wsgbBalance
    const claimable = context.claimable
    const unclaimable = context.unclaimable
    const [rewardadd , setRewardadd] = useState(address)
    const SimpleAddress = address.substring(0,8) + "..." + address.substring(34)

    const claim = () => {
        if(claimable>0){
            if (rewardadd.length === 42) {
                context.claimTx(rewardadd)
            } else {
                alert("Bad address for receive reward")
            }
        } else{
            alert("You have nothing to claim")
        }
        
    }

    return (
        <div className='sidebar_container'>
            <h1 className='title'>Your wallet</h1>
            <div className='wallet_content'>
                <div className="address_section">
                    <span className="subtitle">ADDRESS</span>
                    <div className="addressContent">
                        <p style={{fontSize:"15px"}}>{SimpleAddress}</p>
                        <CopyToClipboard text={address}
                        >
                            <button className='copy_address'>
                                <i className="far fa-copy"></i>
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
            <div className='coin_section'>
                <h1 className="subtitle">ASSETS</h1>
                <div className="songBird">
                    <img src={SGBICON} alt="" />
                    <span className="sonbirgName">SongBird</span>
                    <span className="value">{Number.parseFloat(sgbBalance).toFixed(2)}</span>
                    <span className="sbg">SGB</span>
                </div>
                <div className="WsongBird">
                    <img src={WSGBICON} alt="" />
                    <span className="WsonbirgName">WSongBird</span>
                    <span className="Wvalue">{Number.parseFloat(wsgbBalance).toFixed(2)}</span>
                    <span className="Wsbg">WSGB</span>
                </div>
            </div>
            <div className='statistics_section'>
                <h1 className="subtitle">STATISTICS</h1>
                <div className='statistics_content'>
                    <p className="labelInput">Claim your rewards to the below address:</p>
                    <input 
                        className="inputtext" 
                        type="text" 
                        placeholder="Address for receive reward" 
                        value={rewardadd}  
                        onChange={(e)=>setRewardadd(e.target.value)}
                    />
                    <div className='unclaimed_rewards'>
                        <div>
                            <p>Unclaimed rewards</p>
                            <p className='period'>from Previous epochs</p>
                        </div>
                        <p> {Number.parseFloat(claimable).toFixed(2)} SGB</p>
                    </div>
                    <div className='pending_rewards'>
                        <div>
                            <p>Pending rewards</p>
                            <p className='period'>from current epochs</p>
                        </div>
                        <p> {Number.parseFloat(unclaimable).toFixed(2)} SGB</p>
                    </div>
                </div>
            </div>
            <button className="claim_btn" onClick={claim}>Claim Rewards</button>
        </div>
    )
}

export default SideBar