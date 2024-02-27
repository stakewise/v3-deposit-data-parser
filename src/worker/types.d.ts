export type FileItem = {
  amount: number
  pubkey: string
  signature: string
}

export type DepositDataFile = FileItem[]

export type OnError = (error: Error) => void

export type DepositData = {
  amount: number
  signature: Buffer
  pubkey: Uint8Array
  withdrawalCredentials: Buffer
}

export type WorkerInput = {
  file: File
  config: Config
  network: SupportedNetworks
  vaultAddress: string
}

export type WorkerOutput = {
  validators?: number
  merkleRoot?: string
  publicKeys?: string[]
  error?: string
  progress?: {
    total: number
    value: number
  }
}

export type SupportedNetworks = 'mainnet' | 'goerli' | 'gnosis' | 'holesky'

export type ErrorTypes =
  'EMPTY_FILE' |
  'MISSING_FIELDS' |
  'INVALID_SIGNATURE' |
  'INVALID_JSON_FORMAT' |
  'DUPLICATE_PUBLIC_KEYS' |
  'INVALID_PUBLIC_KEY_FORMAT' |
  'MERKLE_TREE_GENERATION_ERROR'

export type Error = {
  message: string
  type: ErrorTypes
}
