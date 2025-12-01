import ParserError from './helpers/errors'


export type FileItem = {
  amount: number
  pubkey: string
  signature: string
  withdrawal_address?: string
}

export type DepositDataFile = FileItem[]

type Progress = {
  total: number
  value: number
}

export type DepositData = {
  amount: number
  signature: Buffer
  pubkey: Uint8Array
  withdrawalCredentials: Buffer
}

export type ParserInput = {
  data: DepositDataFile
  vaultAddress: string
  network: SupportedNetworks
  onProgress?: (progress: Progress) => void
}

export type ParserOutput = {
  validators?: number
  merkleRoot?: string
  publicKeys?: string[]
  error?: ParserError
  progress?: Progress
}

export type SupportedNetworks = 'mainnet' | 'gnosis' | 'hoodi'
