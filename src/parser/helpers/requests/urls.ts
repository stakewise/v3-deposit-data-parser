import type { SupportedNetworks } from '../../types'


export const urls: Record<SupportedNetworks, string> = {
  'holesky': 'https://graphs.stakewise.io/holesky/subgraphs/name/stakewise/prod',
  // TODO replace with https://graphs.stakewise.io/mainnet/subgraphs/name/stakewise/prod
  'mainnet': 'https://graphs.stakewise.io/mainnet-stage/subgraphs/name/stakewise/prod',
  'gnosis': 'https://gnosis-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
  'chiado': 'https://chiado-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
}
