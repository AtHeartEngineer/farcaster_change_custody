import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { optimism } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http()
});

export const walletClient = createWalletClient({
  chain: optimism,
  transport: custom(window.ethereum)
});

export const getAccountAddress = async () => {
  const [firstAddress] = await walletClient.getAddresses();
  return firstAddress;
};

