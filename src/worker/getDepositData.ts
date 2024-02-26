import { getBytes } from 'ethers'

import type { DepositData, OnError } from './types'
import { getWithdrawalCredentials, prefix0x } from './helpers'


type Input = {
  pubkey: string
  vaultAddress: string
  onError: OnError
}

const getDepositData = (values: Input): DepositData => {
  const { pubkey, vaultAddress, onError } = values

  try {
    const withdrawalCredentials = getWithdrawalCredentials(vaultAddress)

    const depositData = {
      pubkey: getBytes(prefix0x.add(pubkey)),
      amount: 32000000000, // 32 ETH in GWEI
      signature: Buffer.alloc(0),
      withdrawalCredentials,
    }

    return depositData
  }
  catch (error) {
    console.error(error)

    onError('Failed to parse deposit data public key')

    return {
      amount: 0,
      pubkey: new Uint8Array,
      signature: Buffer.alloc(0),
      withdrawalCredentials: Buffer.alloc(0),
    }
  }
}


export default getDepositData
