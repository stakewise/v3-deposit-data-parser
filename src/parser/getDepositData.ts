import type { DepositData } from './types'
import { getWithdrawalCredentials, prefix0x, ParserError, ErrorTypes, getBytes } from './helpers'


type Input = {
  pubkey: string
  amount: number
  vaultAddress: string
}

const getDepositData = (values: Input): DepositData => {
  const { pubkey, vaultAddress, amount } = values

  try {
    const withdrawalCredentials = getWithdrawalCredentials(vaultAddress)

    const depositData = {
      amount,
      pubkey: getBytes(prefix0x.add(pubkey)),
      signature: Buffer.alloc(0),
      withdrawalCredentials,
    }

    return depositData
  }
  catch (error) {
    console.error(error)

    throw new ParserError(ErrorTypes.INVALID_PUBLIC_KEY_FORMAT)
  }
}


export default getDepositData
