import { ID_REGISTRY_EIP_712_TYPES, idRegistryABI, ID_GATEWAY_ADDRESS } from '@farcaster/core';
import { walletClient, account } from './clients';
import { readNonce, getDeadline } from './helpers';

const nonce = await readNonce();
const deadline = getDeadline();
const IdContract = {
  abi: idRegistryABI,
  address: ID_GATEWAY_ADDRESS,
  chain: optimism
};

export const signature = await walletClient.signTypedData({
  account,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'Transfer',
  message: {
    fid: 1n,
    to: account,
    nonce,
    deadline
  }
});
