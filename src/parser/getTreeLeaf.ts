import { containers, prefix0x, ParserError, ErrorTypes, getBytes } from './helpers'
import type { DepositData } from './types'


export type TreeLeafInput = {
  pubkey: string
  signature: string
  depositData: DepositData
  withdrawalAddress?: string
}

// Creates an array concatenating pubkey, signature, hashTreeRoot and withdrawalAddress for a given deposit data
// This array is used to create a Merkle tree and load it into IPFS
const getTreeLeaf = (values: TreeLeafInput): Uint8Array => {
  const { depositData, pubkey, signature, withdrawalAddress } = values

  try {
    // Calculate the hash tree root for the given deposit data and signature
    const hashTreeRoot = containers.depositData.hashTreeRoot({
      ...depositData,
      signature: getBytes(prefix0x.add(signature)),
    })

    const leafParts = [
      getBytes(prefix0x.add(pubkey)),
      getBytes(prefix0x.add(signature)),
      hashTreeRoot,
    ]

    // Optionally add the withdrawal address if it exists
    if (withdrawalAddress) {
      leafParts.push(getBytes(prefix0x.add(withdrawalAddress)))
    }

    const treeLeaf = Buffer.concat(leafParts)

    return treeLeaf
  }
  catch (error) {
    console.error(error)

    throw new ParserError(ErrorTypes.MERKLE_TREE_GENERATION_ERROR)
  }
}


export default getTreeLeaf
