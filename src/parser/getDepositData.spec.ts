import type { DepositDataInput } from './getDepositData'
import { mockData, getAmount } from './helpers'
import getDepositData from './getDepositData'
import { SupportedNetworks } from './types'


const { pubkey } = mockData[0]

const mockInput = {
  pubkey,
  vaultAddress: '0x9b6a6867d222d62dc301528190e3984d60adb06b',
}

describe('getDepositData',() => {
  const networks: SupportedNetworks[] = [ 'holesky', 'mainnet', 'gnosis', 'chiado' ]

  networks.forEach(network => {
    it(`processes valid amount with "${network}" network`, () => {
      const data: DepositDataInput = { ...mockInput, network }
      const amount = getAmount(network)
      const result = getDepositData(data)

      expect(getDepositData(data)).toEqual(result)
      expect(result.amount).toEqual(amount)
    })
  })
})
