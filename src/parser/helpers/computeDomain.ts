import containers from './containers'


// The computeDomain function calculates the domain for Ethereum 2.0 messages,
// considering the message type, network version, and genesis validators state.
// It returns a 32-byte Uint8Array representing the computed domain.

type Input = {
  domainType: Uint8Array
  currentVersion: Uint8Array
  genesisValidatorsRoot: Uint8Array
}

const computeDomain = (values: Input): Uint8Array => {
  const { domainType, currentVersion, genesisValidatorsRoot } = values

  // Calculate the root of the hash tree for fork data using the hashTreeRoot function of the forkData container
  const forkDataRoot = containers.forkData.hashTreeRoot({
    currentVersion,
    genesisValidatorsRoot,
  })

  const domain = new Uint8Array(32)

  // Fill in the first 4 bytes of the domain with the domainType
  domain.set(domainType, 0)

  // Fill in the remaining 28 bytes with the values of the hash tree root of the forkData
  domain.set(forkDataRoot.slice(0, 28), 4)

  return domain
}


export default computeDomain
