import { getBytes } from './getBytes'

import type { SupportedNetworks } from '../types'

// The values are in hexadecimal format and are intended to determine
// the domain when signing messages in the context of Ethereum 2.0
const forkVersions: Record<SupportedNetworks, string> = {
  'holesky': '0x4268',
  'mainnet': '0x1',
  'gnosis': '0x64',
  'chiado': '0x27D8',
}

const getForkVersion = (network: SupportedNetworks) => getBytes(forkVersions[network])


export default getForkVersion
