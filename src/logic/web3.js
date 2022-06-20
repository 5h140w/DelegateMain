import { ethers } from 'ethers'
import { getWNatContract } from './wnat.js'
import { getFtsoRewardManagerContract } from './ftsorewardmanager'
import { getFtsoManagerContract } from './ftsomanager'
import { getPriceSubmitterContract } from './pricesubmitter'

let provider
let signer
let currentNetwork

export const getProvider = () => provider
export const getSigner = () => signer

export const setProvider = (p) => { provider = p }
export const setSigner = (s) => { signer = s }
export const setNetwork = (n) => { currentNetwork = n }

export const getNetwork = () => currentNetwork

export const networks = {
  '0x13': {
    chainId: '0x13',
    chainName: 'Songbird',
    nativeCurrency: { decimals: 18, symbol: 'SGB' },
    rpcUrls: ['https://songbird.towolabs.com/rpc'],
    blockExplorerUrls: ['https://songbird-explorer.flare.network/'],
  }
}

export const defaultNetwork = '0x13'

export const knownFTSO = {
  "0x021305bb75b9d7f720fd328d137114c930917b62": "Flare Trusted #1",
  "0x651ccebfa2c5aa1e6d9c6180d91079f120314080": "Flare Trusted #2",
  "0x96b83d3f73e44c9a96388cf1d116595551daeb5a": "Flare Trusted #3",
  "0x69141e890f3a79cd2cff552c0b71508be23712dc": "Bifrost Oracle",
  "0x9a46864a3b0a7805b266c445289c3fad1e48f18e": "Bifrost Oracle",
  "0x4ed9e5b82ce66311ac2230d2fccc5202d7b8c083": "ScandiNodes FTSO",
  "0x6d323e71e141ce2d7b752313c8a654a9c9d1b377": "Aureus Ox",
  "0x9269fb79b098ab314de8a1e2afb8705678520443": "Aureus Ox",
  "0xbf61db1cdb43d196309824473fa82e5b17581159": "AlphaOracle",
  "0x47b6effe71abd4e8cdcc56f2341beb404f804b87": "AlphaOracle",
  "0x010a16c53f33e4d93892f00897965578b55a8cfc": "FTSO EU",
  "0xb0421af2cffb21d8a0be4087448146e4f9cbd306": "FTSO EU",
  "0xb9b7355f5b71cee345311921d247b1d2ba5cfe90": "FTSO UK",
  "0x5f911c2c681f678e5a3a8d54f950d6b192cc16e3": "FTSO UK",
  "0x499017adb21d6f70480e4e6224cf4144071c1461": "FTSO AU",
  "0x53caedda4339ed74272ecfef85b657def18fa2e4": "Use Your Spark",
  "0xa288054b230dcbb8689ac229d6dbd7df39203181": "Use Your Spark",
  "0x7394923453fc2f606cfb4d0ea1a5438bb8260d08": "Sun-Dara",
  "0x1e8f916ce03f4ce86186531a8994d366581ed4be": "Sun-Dara",
  "0x62d6116d6a139f2d402e8d8e30baaf5790542801": "Interoracle",
  "0xc9ac8f034d295962a6a975b717b691437605bbb6": "Lena Instruments",
  "0x2d7bf53ed6117ad1dcd6416d460481522a16afdf": "A-FTSO",
  "0x939789ed3d07a80da886a3e3017d665cbb5591dc": "Best FTSO",
  "0x9565d813a3a0cea62b3bdb9a4e236dcb5910c4f0": "AFLabs",
}

export async function setupNetwork(network) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networks[network].chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networks[network]],
        });
      } catch (addError) {
        if (addError.code === 4001) {
          console.log("Please approve Songbird network.");
        } else {
          console.error(addError);
        }
      }
    } else if (switchError.code === 4001) {
      console.log("Songbird configuration already present.");
    } else {
      console.error(switchError);
    }
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
}

export async function wrap(amount) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const nat = ethers.utils.parseUnits(amount, 18);
  const tx = await wNatContract.deposit({ value: nat });
  const result = await tx.wait();
  return result;
}

export async function unwrap(amount) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const nat = ethers.utils.parseUnits(amount, 18);
  const tx = await wNatContract.withdraw(nat);
  const result = await tx.wait();
  return result;
}

const delay = ms => new Promise((res) => setTimeout(res, ms));

export async function getWnatBalance() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const balance = await wNatContract.balanceOf(signer.getAddress());
  return ethers.utils.formatUnits(balance, 18);
}

export async function getDelegations() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const result = await wNatContract.delegatesOf(signer.getAddress());
  const delegations = [];
  result[0].forEach((e, i) =>
    delegations.push({ address: e, amount: result[1][i].toNumber() })
  );
  return delegations;
}

export async function getAvailableDelegations() {
  const delegations = await getDelegations() 
  let available = 10000
  delegations.forEach(e => { if(e.address !== '0xc9AC8F034d295962A6a975b717B691437605Bbb6') available -= e.amount })
  return available/100
}

export async function getLenaDelegations() {
  const delegations = await getDelegations() 
  let result = 0
  delegations.forEach(e => { if(e.address === '0xc9AC8F034d295962A6a975b717B691437605Bbb6') result += e.amount })
  return result/100
}

export async function getDelegationType() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const delegationType = await wNatContract.delegationModeOf(
    signer.getAddress()
  );
  return delegationType;
}

export async function delegate(amount) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const tx = await wNatContract.delegate(
    "0xc9AC8F034d295962A6a975b717B691437605Bbb6",
    "" + amount * 100
  );
  return await tx.wait();
}

export async function undelegate(from) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const tx = await wNatContract.delegate(from, "0");
  return await tx.wait();
}

export async function getClaimable() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const rewardsContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const epochs = await rewardsContract.getEpochsWithUnclaimedRewards(
    signer.getAddress()
  );
  const claimableEpochs = [];
  let rewardsAmount = ethers.BigNumber.from(0);
  for (let i = 0; i < epochs.length; i++) {
    const reward = await rewardsContract.getStateOfRewards(
      signer.getAddress(),
      epochs[i]
    );
    if (reward._claimable) {
      claimableEpochs.push(epochs[i]);
      for (let j = 0; j < reward._dataProviders.length; j++) {
        if (!reward._claimed[j]) {
          rewardsAmount = rewardsAmount.add(reward._rewardAmounts[j]);
        }
      }
    }
  }
  return ethers.utils.formatEther(rewardsAmount);
}

export async function getUnclaimable() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const rewardsContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const currentRewardEpoch = await ftsoManagerContract.getCurrentRewardEpoch();
  const pendingReward = await rewardsContract.getStateOfRewards(
    signer.getAddress(),
    currentRewardEpoch
  );
  let pendingRewardsAmount = ethers.BigNumber.from(0);
  for (let j = 0; j < pendingReward._dataProviders.length; j++) {
    const amount = pendingReward._rewardAmounts[j];
    pendingRewardsAmount = pendingRewardsAmount.add(amount);
  }
  return ethers.utils.formatEther(pendingRewardsAmount);
}

export async function claim(rewardAddress) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const rewardsContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const epochs = await rewardsContract.getEpochsWithUnclaimedRewards(
    signer.getAddress()
  );
  const claimableEpochs = await epochs.map(async (e) => {
    const reward = await rewardsContract.getStateOfRewards(
      signer.getAddress(),
      e
    );
    if (reward._claimable) return e;
  });
  const tx = await rewardsContract.claimReward(
    rewardAddress,
    claimableEpochs.slice(0, 20)
  );
  return await tx.wait();
}
