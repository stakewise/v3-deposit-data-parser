import { getBytes } from 'ethers'

import type { SupportedNetworks } from '../types'

// The values are in hexadecimal format and are intended to determine
// the domain when signing messages in the context of Ethereum 2.0
const forkVersions: Record<SupportedNetworks, string> = {
  'holesky': '0x01017000',
  'mainnet': '0x00000000',
  'goerli': '0x00001020',
  'gnosis': '0x00000064',
}

const getForkVersion = (network: SupportedNetworks) => getBytes(forkVersions[network])


export default getForkVersion
