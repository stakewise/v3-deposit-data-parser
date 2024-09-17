import { DepositData, SupportedNetworks } from './types'
import {
  prefix0x,
  ErrorTypes,
  ParserError,
  getBytes,
  getAmount,
  getEigenPodAddress,
  getWithdrawalCredentials,
} from './helpers'


export type DepositDataInput = {
  pubkey: string
  isRestake: boolean
  vaultAddress: string
  withdrawalAddress?: string
  network: SupportedNetworks
}

const getDepositData = async (values: DepositDataInput): Promise<DepositData> => {
  const { pubkey, vaultAddress, isRestake, withdrawalAddress, network } = values

  const withdrawalCredentialAddress = isRestake
    ? await getEigenPodAddress({ vaultAddress, withdrawalAddress, network })
    : vaultAddress

  try {
    const withdrawalCredentials = getWithdrawalCredentials(withdrawalCredentialAddress)

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
