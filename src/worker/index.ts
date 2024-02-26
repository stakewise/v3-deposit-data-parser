import initBls from './initBls'
import getTreeLeaf from './getTreeLeaf'
import validateFile from './validateFile'
import getPostMessage from './getPostMessage'
import getDepositData from './getDepositData'
import validateFields from './validateFields'
import verifySignature from './verifySignature'
import type { FileItem, WorkerInput } from './types'


export function depositDataParser() {
  self.addEventListener('message', async (event: MessageEvent<WorkerInput>) => {
    const { vaultAddress, network, file } = event.data

    const onError = (error: string) => {
      postMessage({ error })
      close()

      throw new Error() // to stop the cycle and skip other checks
    }

    const bls = await initBls()
    const parsedFile = await validateFile({ file, onError })

    if (parsedFile) {
      const pubkeySet = new Set<string>()
      const treeLeaves: Uint8Array[] = []

      parsedFile?.forEach((item: FileItem, index) => {
        const { pubkey, signature } = item

        validateFields({ item, onError })

        const depositData = getDepositData({ pubkey, vaultAddress, onError })

        verifySignature({ bls, pubkey, signature, depositData, network, onError })

        const treeLeaf = getTreeLeaf({ pubkey, signature, depositData, onError })

        pubkeySet.add(pubkey)
        treeLeaves.push(treeLeaf)

        if (parsedFile.length > 1000) {
          postMessage({
            progress: {
              total: parsedFile.length,
              value: index + 1,
            },
          })
        }
      })

      if (pubkeySet.size !== parsedFile?.length) {
        onError('Failed to verify the deposit data public keys. All the entries must be unique.')
      }

      const result = getPostMessage({ pubkeySet, parsedFile, treeLeaves })

      postMessage(result)
    }

    close()
  })
}
