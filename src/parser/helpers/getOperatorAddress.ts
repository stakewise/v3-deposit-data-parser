import { getEigenPods } from './requests'
import { SupportedNetworks } from '../types'
import ParserError, { ErrorTypes } from './errors'


type Input = {
  vaultAddress: string
  withdrawalAddress?: string
  network: SupportedNetworks
}

const getOperatorAddress = async (values: Input): Promise<string> => {
  const { vaultAddress, withdrawalAddress, network } = values

  if (!withdrawalAddress) {
    throw new ParserError(ErrorTypes.MISSING_FIELDS, { fields: [ 'withdrawal_address' ] })
  }

  const eigenPods = await getEigenPods(vaultAddress, network)

  if (!eigenPods || eigenPods.length === 0) {
    throw new ParserError(ErrorTypes.EIGEN_PODS_EMPTY)
  }

  const operatorAddress = eigenPods.find((eigenPod) => eigenPod.address === withdrawalAddress)

  if (!operatorAddress) {
    throw new ParserError(ErrorTypes.INVALID_WITHDRAW_ADDRESS)
  }

  return operatorAddress.address
}


export default getOperatorAddress
