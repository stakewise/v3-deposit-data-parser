import type { SupportedNetworks } from '../types'


const amounts: Record<SupportedNetworks, number> = {
  'holesky': 32000000000,
  'mainnet': 32000000000,
  'gnosis': 32000000000,
  'chiado': 32000000000,
}

const getAmount = (network: SupportedNetworks) => amounts[network]


export default getAmount
