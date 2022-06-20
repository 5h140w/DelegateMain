import { ethers } from "ethers";

export function getPriceSubmitterContract(provider) {
  const abi = [
    "function getFtsoManager() external view returns (address)",
    "function getVoterWhitelister() external view returns (address)",
  ];
  return new ethers.Contract(
    "0x1000000000000000000000000000000000000003",
    abi,
    provider
  );
}
