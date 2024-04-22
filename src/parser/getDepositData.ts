import { DepositData, SupportedNetworks } from './types'
import { getWithdrawalCredentials, prefix0x, ParserError, ErrorTypes, getBytes, getAmount } from './helpers'


export type DepositDataInput = {
  pubkey: string
  vaultAddress: string
  network: SupportedNetworks
}

const getDepositData = (values: DepositDataInput): DepositData => {
  const { pubkey, vaultAddress, network } = values

  try {
    const withdrawalCredentials = getWithdrawalCredentials(vaultAddress)

    const depositData = {
      amount: getAmount(network),
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
