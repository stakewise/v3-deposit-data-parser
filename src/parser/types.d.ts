import ParserError from './helpers/errors'


export type FileItem = {
  amount: number
  pubkey: string
  signature: string
  fork_version: string
  deposit_data_root: string
  deposit_cli_version: string
  deposit_message_root: string
  withdrawal_credentials: string
  network_name: SupportedNetworks
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

export type SupportedNetworks = 'mainnet' | 'gnosis' | 'holesky' | 'chiado'
