import type { SupportedNetworks } from '../types'


const amounts: Record<SupportedNetworks, number> = {
  mainnet: 32000000000,
  gnosis: 32000000000,
  hoodi: 32000000000,
}

const getAmount = (network: SupportedNetworks) => amounts[network]


export default getAmount
