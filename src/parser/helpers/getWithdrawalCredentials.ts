import { getBytes } from './getBytes'


// is a one-byte array with the number 1, which indicates that
// the withdrawal credentials match the Ethereum 1.0 address
const eth1AddressWithdrawalPrefix = Uint8Array.from([ 1 ])

// 32-byte withdrawal credentials: 1 prefix byte + 11 zero padding bytes + 20-byte vault address
const getWithdrawalCredentials = (vaultAddress: string): Uint8Array => {
  const result = new Uint8Array(32)

  // indicates the type of address to output
  result.set(eth1AddressWithdrawalPrefix, 0)

  // bytes 1–11 stay zero (padding to 32 bytes), the vault address goes after the padding
  result.set(getBytes(vaultAddress), 12)

  return result
}


export default getWithdrawalCredentials
