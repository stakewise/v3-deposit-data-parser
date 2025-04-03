import type { SupportedNetworks } from '../../types'


export const urls: Record<SupportedNetworks, string> = {
  mainnet: 'https://graphs.stakewise.io/mainnet/subgraphs/name/stakewise/prod',
  gnosis: 'https://graphs.stakewise.io/gnosis/subgraphs/name/stakewise/prod',
  chiado: 'https://graphs.stakewise.io/chiado/subgraphs/name/stakewise/prod',
  hoodi: 'https://graphs.stakewise.io/hoodi/subgraphs/name/stakewise/prod',
}
