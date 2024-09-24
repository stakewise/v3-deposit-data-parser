import type { SupportedNetworks } from '../../types'


export const urls: Record<SupportedNetworks, string> = {
  'holesky': 'https://graphs.stakewise.io/holesky/subgraphs/name/stakewise/prod',
  'mainnet': 'https://mainnet-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
  'gnosis': 'https://gnosis-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
  'chiado': 'https://chiado-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
}
