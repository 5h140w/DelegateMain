import { ethers } from 'ethers'

export function getFtsoManagerContract(provider, address) {
  const abi = [
    "function rewardManager() public view returns (address)",
    "function getCurrentRewardEpoch() public view returns (uint256)",
    "function rewardEpochDurationSeconds() public view returns (uint256)",
    "function rewardEpochsStartTs() public view returns (uint256)",
    "function rewardEpochs(uint256 epoch) public view returns (uint256 votepowerBlock, uint256 startBlock, uint256 startTimestamp)",
  ];
  return new ethers.Contract(address, abi, provider);
}
