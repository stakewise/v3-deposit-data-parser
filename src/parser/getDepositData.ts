import { getBytes } from 'ethers'

import type { DepositData } from './types'
import { getWithdrawalCredentials, prefix0x, createError, ErrorTypes } from './helpers'


type Input = {
  pubkey: string
  vaultAddress: string
}

const getDepositData = (values: Input): DepositData => {
  const { pubkey, vaultAddress } = values

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

    throw (createError(ErrorTypes.INVALID_PUBLIC_KEY_FORMAT))
  }
}


export default getDepositData
