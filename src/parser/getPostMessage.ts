import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

import type { DepositDataFile, ParserOutput } from './types'
import { ParserError, ErrorTypes } from './helpers'


type Input = {
  pubkeySet: Set<string>
  depositDataRoot: string
  treeLeaves: Uint8Array[]
  parsedFile: DepositDataFile
}

const getPostMessage = (values: Input) => {
  const { depositDataRoot, pubkeySet, treeLeaves, parsedFile } = values

  const merkleTree = StandardMerkleTree.of(
    treeLeaves.map((value, index) => [ value, index ]),
    [ 'bytes', 'uint256' ]
  )

  if (depositDataRoot === merkleTree.root) {
    throw new ParserError(ErrorTypes.DUPLICATE_DEPOSIT_DATA)
  }

  const postMessage: ParserOutput = {
    merkleRoot: merkleTree.root,
    validators: parsedFile?.length || 0,
    publicKeys: Array.from(pubkeySet) as string[],
  }

  return postMessage
}


export default getPostMessage
