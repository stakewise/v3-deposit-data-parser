import type { SupportedNetworks } from 'parser/types'


export const urls: Record<SupportedNetworks, string> = {
  'holesky': 'https://holesky-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
  'mainnet': 'https://mainnet-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
  'gnosis': 'https://graph-gno.stakewise.io/subgraphs/name/stakewise/stakewise',
  'chiado': 'https://chiado-graph.stakewise.io/subgraphs/name/stakewise/stakewise',
}
