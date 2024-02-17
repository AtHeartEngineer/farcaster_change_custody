import { ID_REGISTRY_ADDRESS, idRegistryABI } from '@farcaster/core';
import { publicClient, account } from './clients';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: ID_REGISTRY_ADDRESS,
    abi: idRegistryABI,
    functionName: 'nonce',
    args: [account]
  });
};
