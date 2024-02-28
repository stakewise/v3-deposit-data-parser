import { createError, ErrorTypes } from './helpers'

import initBls from './initBls'
import getTreeLeaf from './getTreeLeaf'
import validateFile from './validateFile'
import getPostMessage from './getPostMessage'
import getDepositData from './getDepositData'
import validateFields from './validateFields'
import verifySignature from './verifySignature'
import type { FileItem, ParserInput } from './types'


export const depositDataParser = async (input: ParserInput) => {
  const { vaultAddress, network, file, onProgress } = input

  const bls = await initBls()
  const parsedFile = await validateFile({ file })

  if (parsedFile) {
    const pubkeySet = new Set<string>()
    const treeLeaves: Uint8Array[] = []

    parsedFile.forEach((item: FileItem, index) => {
      const { pubkey, signature } = item

      validateFields({ item })

      const depositData = getDepositData({ pubkey, vaultAddress })

      verifySignature({ bls, pubkey, signature, depositData, network })

      const treeLeaf = getTreeLeaf({ pubkey, signature, depositData })

      pubkeySet.add(pubkey)
      treeLeaves.push(treeLeaf)

      if (parsedFile.length > 1000) {
        if (typeof onProgress === 'function') {
          onProgress({
            total: parsedFile.length,
            value: index + 1,
          })
        }
      }
    })

    if (pubkeySet.size !== parsedFile?.length) {
      throw (createError(ErrorTypes.DUPLICATE_PUBLIC_KEYS))
    }

    return getPostMessage({ pubkeySet, parsedFile, treeLeaves })
}
}
