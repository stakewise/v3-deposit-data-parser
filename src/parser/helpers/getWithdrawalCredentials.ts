import { getBytes } from './getBytes'


// is a one-byte array with the number 1, which indicates that
// the withdrawal credentials match the Ethereum 1.0 address
const eth1AddressWithdrawalPrefix = Uint8Array.from([ 1 ])

const getWithdrawalCredentials = (vaultAddress: string): Buffer => Buffer.concat([
  // indicates the type of address to output
  eth1AddressWithdrawalPrefix,

  // 11 bytes filled with zeros – this is padding needed to make the withdrawal
  // credentials have a length of 32 bytes (corresponding to the hash size in Ethereum)
  Buffer.alloc(11),

  // Vault address converted to an array of bytes
  getBytes(vaultAddress),
])


export default getWithdrawalCredentials
