import { ViemWalletEip712Signer } from '@farcaster/core';
import { Address, bytesToHex } from 'viem';
import { walletClient, publicClient, getAccountAddress } from './client';
import { idContract } from './contract';
import { readNonce, getDeadline } from './helper';

/**
 * Transfers Farcaster account to a new owner.
 *
 * @param fid ID of farcaster account
 * @param to Account address to trasnfer ownership to
 */
export const transferAccount = async (fid: bigint, to: Address) => {
  // TODO fix 'any' typing, signer constrcutor expeting wallet client with netowrk prop.
  const eip712Signer = new ViemWalletEip712Signer(walletClient as any);

  const account = await getAccountAddress();
  const nonce = await readNonce(account);
  const deadline = getDeadline();
  
  const sigRes = await eip712Signer.signTransfer({
    fid,
    to,
    nonce,
    deadline
  });
  // See https://github.com/supermacro/neverthrow/wiki/Basic-Usage-Examples#asynchronous-api for neverthrow pattern
  if (sigRes.isErr()) {
    throw sigRes.error;
  }
  const signature = bytesToHex(sigRes.value);
  
  const { request: transferRequest } = await publicClient.simulateContract({
    ...idContract,
    account,
    functionName: 'transfer',
    args: [account, deadline, signature] // to, deadline, signature
  });
  
  await walletClient.writeContract(transferRequest);
};
