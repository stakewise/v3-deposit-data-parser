import { getEigenPods } from './requests'
import ParserError, { ErrorTypes } from './errors'
import getEigenPodAddress from './getEigenPodAddress'
import type { GetEigenPodAddressInput } from './getEigenPodAddress'


type MockGetEigenPods = jest.MockedFunction<typeof getEigenPods>

jest.mock('./requests/getEigenPods')

describe('getEigenPodAddress', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the correct operator address for valid input', async () => {
    const input: GetEigenPodAddressInput = {
      vaultAddress: '0xe05d8895e8b3ba51ce4f89b337c621889d3f38bf',
      withdrawalAddress: '0x6B8c2EBf69aE6c7ae583F219D464637Bd1b6bFa3',
      network: 'holesky',
    };

    (getEigenPods as MockGetEigenPods).mockResolvedValue([
      { address: '0x6B8c2EBf69aE6c7ae583F219D464637Bd1b6bFa3' },
    ])

    const result = await getEigenPodAddress(input)
    expect(result).toBe('0x6B8c2EBf69aE6c7ae583F219D464637Bd1b6bFa3')
  })

  it('should throw an error if withdrawalAddress is missing', async () => {
    const input = {
      vaultAddress: '0xe05d8895e8b3ba51ce4f89b337c621889d3f38bf',
      network: 'holesky',
    } as GetEigenPodAddressInput

    const errorText = new ParserError(ErrorTypes.MISSING_FIELDS, { fields: [ 'withdrawal_address' ] })
    await expect(getEigenPodAddress(input)).rejects.toThrow(errorText)
  })

  it('should throw an error if eigenPods is empty', async () => {
    const input = {
      vaultAddress: '0xe05d8895e8b3ba51ce4f89b337c621889d3f38bf',
      withdrawalAddress: '0x6B8c2EBf69aE6c7ae583F219D464637Bd1b6bFa3',
      network: 'holesky',
    } as GetEigenPodAddressInput

    (getEigenPods as MockGetEigenPods).mockResolvedValue([])

    const errorText = new ParserError(ErrorTypes.EIGEN_PODS_EMPTY)
    await expect(getEigenPodAddress(input)).rejects.toThrow(errorText)
  })

  it('should throw an error if operator address is not found in eigenPods', async () => {
    const input = {
      vaultAddress: '0xe05d8895e8b3ba51ce4f89b337c621889d3f38bf',
      withdrawalAddress: '0x6B8c2EBf69aE6c7ae583F219D464637Bd1b6bFa3',
      network: 'holesky',
    } as GetEigenPodAddressInput

    (getEigenPods as MockGetEigenPods).mockResolvedValue([
      { address: '0xe05d8895e8b3ba51ce4f89b337c621889d3f38bf' },
    ])

    const errorText = new ParserError(ErrorTypes.INVALID_WITHDRAW_ADDRESS)
    await expect(getEigenPodAddress(input)).rejects.toThrow(errorText)
  })
})
