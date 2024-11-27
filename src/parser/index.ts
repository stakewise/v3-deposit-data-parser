import { ParserError, ErrorTypes, requests } from './helpers'

import initBls from './initBls'
import getTreeLeaf from './getTreeLeaf'
import validateJson from './validateJson'
import type { ParserInput } from './types'
import getPostMessage from './getPostMessage'
import getDepositData from './getDepositData'
import validateFields from './validateFields'
import verifySignature from './verifySignature'


export const depositDataParser = async (input: ParserInput) => {
  const { vaultAddress, network, data, onProgress } = input

  const bls = await initBls()
  const parsedFile = validateJson({ data })

  const pubkeySet = new Set<string>()
  const treeLeaves: Uint8Array[] = []

  const vaultInfo = await requests.getVaultInfo(vaultAddress, network)

  for (let index = 0; index < parsedFile.length; index++) {
    const item = parsedFile[index]
    const { pubkey, signature, withdrawal_address } = item

    validateFields({ item })

    const depositData = await getDepositData({
      network,
      pubkey, vaultAddress,
    })

    verifySignature({ bls, pubkey, signature, depositData, network })

    const treeLeaf = getTreeLeaf({ pubkey, signature, depositData, withdrawalAddress: withdrawal_address })

    pubkeySet.add(pubkey)
    treeLeaves.push(treeLeaf)

    if (parsedFile.length > 1000 && typeof onProgress === 'function') {
      onProgress({
        total: parsedFile.length,
        value: index + 1,
      })
    }
  }

  if (pubkeySet.size !== parsedFile?.length) {
    throw new ParserError(ErrorTypes.DUPLICATE_PUBLIC_KEYS)
  }

  return getPostMessage({
    pubkeySet,
    parsedFile,
    treeLeaves,
    depositDataRoot: vaultInfo?.depositDataRoot,
  })
}
