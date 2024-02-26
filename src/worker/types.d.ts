export type FileItem = {
  amount: number
  pubkey: string
  signature: string
}

export type DepositDataFile = FileItem[]

export type OnError = (error: string) => void

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
