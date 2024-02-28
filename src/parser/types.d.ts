import type { Error } from './helpers/errors'


export type FileItem = {
  amount: number
  pubkey: string
  signature: string
}

export type DepositDataFile = FileItem[]

export type OnError = (error: Error) => void

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
  file: File
  vaultAddress: string
  network: SupportedNetworks
  onProgress: (progress: Progress) => void
  onErrorCallback?: (error: Error) => void
}

export type ParserOutput = {
  validators?: number
  merkleRoot?: string
  publicKeys?: string[]
  error?: Error
  progress?: Progress
}

export type SupportedNetworks = 'mainnet' | 'goerli' | 'gnosis' | 'holesky'
