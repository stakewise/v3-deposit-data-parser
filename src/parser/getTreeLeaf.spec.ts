import { ErrorTypes, getAmount, getBytes, getWithdrawalCredentials, mockData, ParserError, prefix0x } from './helpers'
import type { TreeLeafInput } from './getTreeLeaf'
import getTreeLeaf from './getTreeLeaf'


const { pubkey, signature } = mockData[0]

const validInput: TreeLeafInput = {
  pubkey,
  signature,
  depositData: {
    signature: Buffer.alloc(0),
    amount: getAmount('holesky'),
    pubkey: getBytes(prefix0x.add(pubkey)),
    withdrawalCredentials: getWithdrawalCredentials('0x9b6a6867d222d62dc301528190e3984d60adb06b'),
  },
}

describe('getTreeLeaf',() => {

  it('processes valid input without throwing errors',  () => {
    const result = getTreeLeaf(validInput)

    expect(getTreeLeaf(validInput)).toEqual(result)
  })

  it('throws ParserError to verify merkle tree generation error',  () => {
    const errorText = new ParserError(ErrorTypes.MERKLE_TREE_GENERATION_ERROR)

    expect(() => getTreeLeaf({  ...validInput, pubkey: 'invalid_pubkey' })).toThrow(errorText)
    expect(() => getTreeLeaf({  ...validInput, signature: 'invalid_signature' })).toThrow(errorText)
  })
})
