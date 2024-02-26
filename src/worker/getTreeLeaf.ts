import { getBytes } from 'ethers'

import { containers, prefix0x } from './helpers'
import type { DepositData, OnError } from './types'


type Input = {
  pubkey: string
  signature: string
  depositData: DepositData
  onError: OnError
}

// Creates an array concatenating pubkey, signature, and hashTreeRoot for a given deposit data
// This array is used to create a Merkle tree and load it into IPFS
const getTreeLeaf = (values: Input): Uint8Array => {
  const { depositData, pubkey, signature, onError } = values

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

    onError('Failed to generate the Merkle tree')

    return new Uint8Array()
  }
}


export default getTreeLeaf
