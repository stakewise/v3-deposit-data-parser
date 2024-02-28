import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

import type { DepositDataFile, ParserOutput } from './types'


type Input = {
  pubkeySet: Set<string>
  treeLeaves: Uint8Array[]
  parsedFile: DepositDataFile
}

const getPostMessage = (values: Input) => {
  const { pubkeySet, treeLeaves, parsedFile } = values

  const merkleTree = StandardMerkleTree.of(
    treeLeaves.map((value, index) => [ value, index ]),
    [ 'bytes', 'uint256' ]
  )

  const postMessage: ParserOutput = {
    merkleRoot: merkleTree.root,
    validators: parsedFile?.length || 0,
    publicKeys: Array.from(pubkeySet) as string[],
  }

  return postMessage
}


export default getPostMessage
