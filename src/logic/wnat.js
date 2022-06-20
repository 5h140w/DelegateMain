import { ethers } from "ethers";

export function getWNatContract(provider, address) {
  const abi = [
    "function deposit() public payable",
    "function withdraw(uint256 amount) external",
    "function balanceOf(address account) public view returns (uint256)",
    "function delegate(address _to, uint256 _bips) external",
    "function delegateExplicit(address _to, uint _amount) external",
    "function delegatesOf(address _owner) external view returns (address[] memory _delegateAddresses, uint256[] memory _bips, uint256 _count, uint256 _delegationMode)",
    "function delegationModeOf(address _who) external view returns(uint256)",
    "event Deposit(address indexed dst, uint amount)",
    "event Withdrawal(address indexed src, uint amount)",
  ];

  return new ethers.Contract(address, abi, provider);
}
