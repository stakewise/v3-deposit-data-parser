import { DepositData, SupportedNetworks } from './types'
import {
  prefix0x,
  ErrorTypes,
  ParserError,
  requests,
  getBytes,
  getAmount,
  getEigenPodAddress,
  getWithdrawalCredentials,
} from './helpers'


export type DepositDataInput = {
  pubkey: string
  vaultAddress: string
  withdrawalAddress?: string
  network: SupportedNetworks
}

const getDepositData = async (values: DepositDataInput): Promise<DepositData> => {
  const { pubkey, vaultAddress, withdrawalAddress, network } = values

  const isRestakeVault = await requests.checkIsRestakeVault(vaultAddress, network)

  const withdrawalCredentialAddress = isRestakeVault
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
