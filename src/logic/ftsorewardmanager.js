import { ethers } from "ethers";

export function getFtsoRewardManagerContract(provider, address) {
  const abi = [
    "function wNat() public view returns (address)",
    "function claimReward(address payable _recipient, uint256[] memory _rewardEpochs) external returns (uint256 _rewardAmount)",
    "function claimRewardFromDataProviders(address payable _recipient, uint256[] memory _rewardEpochs, address[] memory _dataProviders) external returns (uint256 _rewardAmount)",
    "function getStateOfRewards(address _beneficiary, uint256 _rewardEpoch) external view returns (address[] memory _dataProviders, uint256[] memory _rewardAmounts, bool[] memory _claimed, bool _claimable)",
    "function getStateOfRewardsFromDataProviders(address _beneficiary, uint256 _rewardEpoch, address[] memory _dataProviders) external view returns (uint256[] memory _rewardAmounts, bool[] memory _claimed, bool _claimable)",
    "function getEpochsWithUnclaimedRewards(address _beneficiary) external view returns (uint256[] memory _epochIds)",
    "function getUnclaimedReward(uint256 _rewardEpoch, address _dataProvider) external view returns (uint256 _amount, uint256 _weight)",
    "event RewardClaimed(address indexed dataProvider, address indexed whoClaimed, address indexed sentTo, uint256 rewardEpoch, uint256 amount)",
  ];
  return new ethers.Contract(address, abi, provider);
}

