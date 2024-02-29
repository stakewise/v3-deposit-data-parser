import { getBytes } from 'ethers'

import { containers, prefix0x, ParserError, ErrorTypes } from './helpers'
import type { DepositData } from './types'


type Input = {
  pubkey: string
  signature: string
  depositData: DepositData
}

// Creates an array concatenating pubkey, signature, and hashTreeRoot for a given deposit data
// This array is used to create a Merkle tree and load it into IPFS
const getTreeLeaf = (values: Input): Uint8Array => {
  const { depositData, pubkey, signature } = values

  try {
    // Calculate the hash tree root for the given deposit data and signature
    const hashTreeRoot = containers.depositData.hashTreeRoot({
      ...depositData,
      signature: getBytes(prefix0x.add(signature)),
    })

    const leave = Buffer.concat([
      getBytes(prefix0x.add(pubkey)),
      getBytes(prefix0x.add(signature)),
    ])

    const treeLeaf = Buffer.concat([ leave, hashTreeRoot ])

    return treeLeaf
  }
  catch (error) {
    console.error(error)

    throw new ParserError(ErrorTypes.MERKLE_TREE_GENERATION_ERROR)
  }
}


export default getTreeLeaf
