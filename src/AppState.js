import React, { Component } from 'react'
import { ethers } from "ethers";
import {
  networks,
  defaultNetwork,
  setupNetwork,
  setProvider,
  getProvider,
  setSigner,
  getSigner,
  getNetwork,
  setNetwork,
  getWnatBalance,
  getClaimable,
  claim,
  getUnclaimable
} from "./logic/web3";

const AppState = React.createContext({})

class AppStateProvider extends Component {

  state = {
    connected: false,
    msg: '',
    address: '',
    sgbBalance: 0,
    wsgbBalance: 0,
    claimable: 0,
    unclaimable: 0,
  }

  getWsgbBalance = async() => {
    const b = await getWnatBalance();
    await this.setState({ wsgbBalance: b })
  }

  getRewards = async() => {
    const claimable = 
    Math.floor(
      (await getClaimable().catch((e) => {
         return 0;
      })) * 100
    ) / 100;
    const unclaimable =
    Math.floor(
      (await getUnclaimable().catch((e) => {
         return 0;
      })) * 100
    ) / 100;
    await this.setState({
      claimable: claimable,
      unclaimable: unclaimable
    })
  }

  connect = async() => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await this.checkNetwork();
      await this.checkAccount();
      if (getNetwork() !== undefined) {
        const symbol = getNetwork().nativeCurrency.symbol;
        const address = await getSigner().getAddress();
        //const balance = await getSigner().getBalance();
        const balance = parseFloat(
          ethers.utils.formatUnits(await getSigner().getBalance(), 18)
        );
        await this.setState({
          connected: true,
          address: address,
          sgbBalance: balance
        })
      }
    } catch (err) {
      if (err.code === 4001) {
        console.log("Please connect to MM.");
      } else {
        console.error(err);
        await this.setState({
          connected: false,
          msg: "Connect Metamask"
        })
      }
    }
  }

  checkNetwork = async() => {
    window.ethereum.on("chainChanged", () => window.location.reload());
    let chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (networks[chainId] !== undefined) {
      setNetwork(networks[chainId]);
      await this.handleChainChanged(chainId);
    } else if (window.ethereum.isMetaMask) {
      await setupNetwork(defaultNetwork);
      if (
        chainId === (await window.ethereum.request({ method: "eth_chainId" }))
      )
        await this.setState({
          connected: false,
          msg: "Please change network"
        })
    } else {
       await this.setState({
        connected: false,
        msg: "Please change network"
      })
    }
  } 

  handleChainChanged = async(chainId) => {
    setNetwork(networks[chainId]);
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
    setSigner(getProvider().getSigner());

    if (getNetwork() !== undefined) {
      const symbol = getNetwork().nativeCurrency.symbol;
      const address = await getSigner().getAddress();
      //const balance = await getSigner().getBalance();
      const balance = parseFloat(
        ethers.utils.formatUnits(await getSigner().getBalance(), 18)
      );
      await this.setState({
        connected: true,
        address: address,
        sgbBalance: balance
      })
    } else {
      await this.setState({
        connected: false,
        msg: "Please change network"
      })
    }
  }

  checkAccount = async() => {
    let accounts = await window.ethereum.request({ method: 'eth_accounts' })
    window.ethereum.on('accountsChanged', () => window.location.reload())
    await this.handleAccountsChanged(accounts)
  }

  handleAccountsChanged = async(accounts) => {
    if (accounts.length === 0) {
      await this.setState({
        connected: false,
        msg: "Connect Metamask"
      })
    } else {
      if (getNetwork() !== undefined) {
        const symbol = getNetwork().nativeCurrency.symbol;
        const address = await getSigner().getAddress();
       // const balance = await getSigner().getBalance();
        const balance = parseFloat(
          ethers.utils.formatUnits(await getSigner().getBalance(), 18)
        );
        await this.setState({
          connected: true,
          address: address,
          sgbBalance: balance
        })
      }
    }
  }

  checkWeb3 = async() => {
    if (typeof window.ethereum !== "undefined") {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      setSigner(getProvider().getSigner());
      try {
        await getSigner().getAddress();
        await this.checkNetwork();
        await this.checkAccount();
        if (getNetwork() !== undefined) {
          const symbol = getNetwork().nativeCurrency.symbol;
          const address = await getSigner().getAddress();
          //const balance = await getSigner().getBalance();
          const balance = parseFloat(
            ethers.utils.formatUnits(await getSigner().getBalance(), 18)
          );
          await this.setState({
            connected: true,
            address: address,
            sgbBalance: balance
          })
        }
      } catch (err) {
        console.log(err);
        await this.setState({
          connected: false,
          msg: "Connect Metamask"
        })
      }
    } else {
      console.log("Please install MM!");
      await this.setState({
        onnected: false,
        msg: "Please install MetaMask!",
      })
    }
  }

  componentDidMount() {
    //this.getSgbBalance()
    this.checkWeb3()
    this.getWsgbBalance()
    this.getRewards()
  }

  reset = async() => {
    await this.checkWeb3()
    await this.getWsgbBalance()
    await this.getRewards()
  }

  claimTx = async(rewardAddress) => {
    const result = await claim(rewardAddress).catch((e) => {
      return e;
    });
    this.reset()
  }

  render() {
    return (
      <AppState.Provider
        value={{
          connected: this.state.connected,
          address: this.state.address,
          sgbBalance: this.state.sgbBalance,
          wsgbBalance: this.state.wsgbBalance,
          msg: this.state.msg,
          claimable: this.state.claimable,
          unclaimable: this.state.unclaimable,

          connect: this.connect,
          claimTx: this.claimTx,
          reset: this.reset,
        }}
      >
        {this.props.children}
      </AppState.Provider>
    )
  } 

}

export default AppState 

export { AppStateProvider }
