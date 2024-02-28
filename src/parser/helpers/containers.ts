import { ByteVectorType, ContainerType, UintNumberType } from '@chainsafe/ssz'


// SSZ types creation, the argument is the number of bytes
const byteVector4 = new ByteVectorType(4)
const byteVector32 = new ByteVectorType(32)
const byteVector48 = new ByteVectorType(48)
const byteVector96 = new ByteVectorType(96)
const uintNumber64 = new UintNumberType(8)

// ATTN You cannot change the order of the fields in the objects used to initialize class instances <- (!)
// Each instance of the ContainerType class in this file is a definition of the data structure used in the Ethereum 2.0 interaction.

// "forkData" - a container to store information about the current version of the network and the root
// hash of the genesis block validators. This data is used when calculating the domain for signing messages.
const forkData = new ContainerType(
  {
    currentVersion: byteVector4,
    genesisValidatorsRoot: byteVector32,
  },
  { typeName: 'ForkData', jsonCase: 'eth2' }
)

// "signingData" - a container for storing data that is signed by validators.
// Includes the root of the object and the domain corresponding to the message type.
const signingData = new ContainerType(
  {
    objectRoot: byteVector32,
    domain: byteVector32,
  },
  { typeName: 'SigningData', jsonCase: 'eth2' }
)

// "depositMessage" - container for storing data related to validator deposit.
// Includes validator public key, withdrawal credentials and deposit amount.
const depositMessage = new ContainerType(
  {
    pubkey: byteVector48,
    withdrawalCredentials: byteVector32,
    amount: uintNumber64,
  },
  { typeName: 'DepositMessage', jsonCase: 'eth2' }
)

// "depositData" - container to store full validator deposit data, including signature.
// This structure is used to verify correctness of signature and form hash tree.
const depositData = new ContainerType(
  {
    pubkey: byteVector48,
    withdrawalCredentials: byteVector32,
    amount: uintNumber64,
    signature: byteVector96,
  },
  { typeName: 'DepositData', jsonCase: 'eth2' }
)


export default {
  forkData,
  signingData,
  depositData,
  depositMessage,
}
