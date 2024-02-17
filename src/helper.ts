import { ID_REGISTRY_ADDRESS, idRegistryABI } from '@farcaster/core';
import { Address } from 'viem';
import { publicClient } from './client';

// Returns one hour from now, in seconds
export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return BigInt(now + oneHour);
};

export const readNonce = async (account: Address) => {
  return publicClient.readContract({
    address: ID_REGISTRY_ADDRESS,
    abi: idRegistryABI,
    functionName: 'nonces',
    args: [account]
  });
};
