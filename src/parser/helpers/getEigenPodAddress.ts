import { getEigenPods } from './requests'
import { SupportedNetworks } from '../types'
import ParserError, { ErrorTypes } from './errors'


export type GetEigenPodAddressInput = {
  vaultAddress: string
  withdrawalAddress?: string
  network: SupportedNetworks
}

const getEigenPodAddress = async (values: GetEigenPodAddressInput): Promise<string> => {
  const { vaultAddress, withdrawalAddress, network } = values

  if (!withdrawalAddress) {
    throw new ParserError(ErrorTypes.MISSING_FIELDS, { fields: [ 'withdrawal_address' ] })
  }

  const eigenPods = await getEigenPods(vaultAddress, network)

  if (!eigenPods?.length) {
    throw new ParserError(ErrorTypes.EIGEN_PODS_EMPTY)
  }

  const eigenPod = eigenPods.find((eigenPod) => eigenPod.address === withdrawalAddress)

  if (!eigenPod) {
    throw new ParserError(ErrorTypes.INVALID_WITHDRAW_ADDRESS)
  }

  return eigenPod.address
}


export default getEigenPodAddress
