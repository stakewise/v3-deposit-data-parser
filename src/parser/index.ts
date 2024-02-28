import { createError, ErrorTypes } from './helpers'
import type { ParserError } from './helpers'

import initBls from './initBls'
import getTreeLeaf from './getTreeLeaf'
import validateFile from './validateFile'
import getPostMessage from './getPostMessage'
import getDepositData from './getDepositData'
import validateFields from './validateFields'
import verifySignature from './verifySignature'
import type { FileItem, ParserInput } from './types'


export const depositDataParser = async (input: ParserInput) => {
  const { vaultAddress, network, file, onProgress, onErrorCallback } = input

    const onError = (error: ParserError) => {
      if (typeof onErrorCallback === 'function') {
        onErrorCallback(error)
      }

      throw error // to stop the cycle and skip other checks
    }

    try {
      const bls = await initBls()
      const parsedFile = await validateFile({ file, onError })

      if (parsedFile) {
        const pubkeySet = new Set<string>()
        const treeLeaves: Uint8Array[] = []

        parsedFile.forEach((item: FileItem, index) => {
          const { pubkey, signature } = item

          validateFields({ item, onError })

          const depositData = getDepositData({ pubkey, vaultAddress, onError })

          verifySignature({ bls, pubkey, signature, depositData, network, onError })

          const treeLeaf = getTreeLeaf({ pubkey, signature, depositData, onError })

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
          onError(createError(ErrorTypes.DUPLICATE_PUBLIC_KEYS))
        }

        return getPostMessage({ pubkeySet, parsedFile, treeLeaves })
      }
    } catch (error) {
      console.error(`Deposit data error: ${error}`)
    }
}
