import type { FileItem } from '../types'


const mockData: FileItem[] = [
  {
    amount: 32000000000,
    network_name: 'holesky',
    fork_version: '01017000',
    deposit_cli_version: '2.4.0',
    deposit_data_root: '950adca0cf1cd7f1e0559eb4c0a9328f97d9d43a816ce99594ab00f2fd573ce1',
    deposit_message_root: 'f28453c65b56908ac349fdc8c6e35559ec94e86af50b7828fa60e7b6c8ad6596',
    withdrawal_credentials: '0100000000000000000000009b6a6867d222d62dc301528190e3984d60adb06b',
    pubkey: 'acb0ab0fd445b9df30b49b100e6f9b164ef8c3ca6f6edc6801af7b96cd183b60f5f0be959229d6c5981505a04d2711c4',
    // eslint-disable-next-line max-len
    signature: '8a86e854b9e5f9277e1bb5b642c5222a8ac275b186387da3b284e41e3ec9fe68dc2cbd191156c2ab915e5f4c62cf23aa11e8aca49b7eccd9cdf5dcd99fb639e2579e528bd7b51da137bc3be097759ae388eca0e6c13e02f96eb1d9beb93fb3ae',
  },
]


export default mockData
