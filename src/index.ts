import { ViemWalletEip712Signer } from '@farcaster/core';
import { walletClient, account } from './clients';
import { readNonce, getDeadline } from './helpers';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712Signer.signTransfer({
  fid: 1n,
  to: account,
  nonce,
  deadline
});

const { request: transferRequest } = await walletClient.simulateContract({
  ...IdContract,
  functionName: 'transfer',
  args: [account, deadline, signature] // to, deadline, signature
});

await walletClient.writeContract(transferRequest);
