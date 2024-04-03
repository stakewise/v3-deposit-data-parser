import { containers, computeDomain, getForkVersion, prefix0x, ParserError, ErrorTypes } from './helpers'
import type { DepositData, SupportedNetworks } from './types'


// Deposit domain definition according to Ethereum specification
// https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#domain-types
const domainType = Uint8Array.from([ 3, 0, 0, 0 ])

// Creating a zero hash with a length of 32 bytes
const genesisValidatorsRoot = Buffer.alloc(32, 0)

// Network names
const networkNames: Record<SupportedNetworks, string> = {
  'holesky': 'Holesky Testnet',
  'chiado': 'Chiado Testnet',
  'gnosis': 'Gnosis Chain',
  'mainnet': 'Ethereum',
}

type Input = {
  bls: any
  pubkey: string
  signature: string
  depositData: DepositData
  network: SupportedNetworks
}

const verifySignature = (values: Input) => {
  const { bls, pubkey, signature, depositData, network } = values

  const signatureError = new ParserError(ErrorTypes.INVALID_SIGNATURE, { network: networkNames[network] })

  try {
    const currentVersion = getForkVersion(network)
    const domain = computeDomain({ genesisValidatorsRoot, currentVersion, domainType })
    const objectRoot = containers.depositMessage.hashTreeRoot(depositData)
    const signingRoot = containers.signingData.hashTreeRoot({ objectRoot, domain })

    const pub = bls.deserializeHexStrToPublicKey(prefix0x.remove(pubkey))
    const sig = bls.deserializeHexStrToSignature(prefix0x.remove(signature))
    const isVerifiedSignature = pub.verify(sig, signingRoot)

    if (!isVerifiedSignature) {
      throw (signatureError)
    }
  }
  catch (error) {
    console.error(error)

    throw (signatureError)
  }
}


export default verifySignature
