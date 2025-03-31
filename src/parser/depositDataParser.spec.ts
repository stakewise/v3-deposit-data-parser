import type { FileItem, SupportedNetworks, ParserInput, ParserOutput } from './types'
import { ErrorTypes, mockData, ParserError, requests } from './helpers'
import { networkNames } from './verifySignature'
import { depositDataParser } from './index'


type MockVaultInfo = jest.MockedFunction<typeof requests.getVaultInfo>

jest.mock('./helpers/requests/getVaultInfo')

const testData = mockData[0]

const validInput: ParserInput = {
  vaultAddress: '0xAC0F906E433d58FA868F936E8A43230473652885',
  network: 'mainnet',
  data: mockData,
  onProgress: jest.fn(),
}

const validOutput: ParserOutput = {
  publicKeys: [ '914fc4d761c72c0053b6e71967caf594584d5eb648ecd924f7ad87570a385b66f37b5db8b34d666ca4d2ff9a785984fb' ],
  merkleRoot: '0x9fc6a754977d4e69a51fb5bdbaef88bd46886ec783a8cab34e7963eb7d03aa62',
  validators: 1,
}

describe('depositDataParser',() => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('processes valid input without throwing errors ', async() => {
    await expect(depositDataParser(validInput)).resolves.toEqual(validOutput)
  })

  it('throws ParserError to verify the deposit duplicate public keys', async () => {
    const errorText = new ParserError(ErrorTypes.DUPLICATE_PUBLIC_KEYS)
    const duplicatedData = mockData.concat(mockData)

    await expect(depositDataParser({ ...validInput, data: duplicatedData })).rejects.toThrow(errorText)
  })

  it('throws ParserError to verify the deposit data signatures', async () => {
    // eslint-disable-next-line max-len
    const invalidSignature = 'a18efb4181ed5a009443086b6d2c4998aad6101dc969adbf2af7bd72335cca0e6e4707e50331f338d57cbaf58c1170c517891244ee83939cdbb704189b4b7614b71c8433af0c93b914cccd995c95d832bcc5f98eefde21a4df2f99ac63ab7f0d'
    const signatureError = new ParserError(ErrorTypes.INVALID_SIGNATURE, { network: networkNames[validInput.network] })

    await expect(
      depositDataParser({ ...validInput, data: [ { ...testData, signature: invalidSignature } ] })
    ).rejects.toThrow(signatureError)

    await expect(
      depositDataParser({ ...validInput, data: [ { ...testData, signature: 'invalid_signature' } ] })
    ).rejects.toThrow(signatureError)
  })

  it('throws ParserError to verify the invalid deposit data network', async () => {
    const signatureError = new ParserError(ErrorTypes.INVALID_SIGNATURE, { network: undefined })

    await expect(depositDataParser({ ...validInput, network: 'invalid_network' as SupportedNetworks })).rejects.toThrow(signatureError)
  })

  it('throws ParserError if the field "pubkey" is missing', async () => {
    const { pubkey, ...dataWithoutPubkey } = testData
    const errorText = new ParserError(ErrorTypes.MISSING_FIELDS, { fields: 'pubkey' })

    await expect(depositDataParser({ ...validInput, data: [ { ...dataWithoutPubkey as unknown as FileItem } ] })).rejects.toThrow(errorText)
  })

  it('throws ParserError if the field invalid public key format', async () => {
    const errorText = new ParserError(ErrorTypes.INVALID_PUBLIC_KEY_FORMAT)

    await expect(depositDataParser({ ...validInput, data: [ { ...testData, pubkey: 'invalid_pubkey' } ] })).rejects.toThrow(errorText)
    await expect(depositDataParser({ ...validInput, vaultAddress: 'invalid_vaultAddress' })).rejects.toThrow(errorText)
  })

  it('throws ParserError if the field "signature" is missing', async () => {
    const { signature, ...dataWithoutPubkey } = testData
    const errorText = new ParserError(ErrorTypes.MISSING_FIELDS, { fields: 'signature' })

    await expect(depositDataParser({ ...validInput, data: [ { ...dataWithoutPubkey as unknown as FileItem } ] })).rejects.toThrow(errorText)
  })

  it('throws ParserError if the field "signature" & "pubkey" is missing', async () => {
    const { signature, pubkey, ...dataWithoutPubkey } = testData
    const errorText = new ParserError(ErrorTypes.MISSING_FIELDS, { fields: [ 'pubkey', 'signature' ].join(',') })

    await expect(depositDataParser({ ...validInput, data: [ { ...dataWithoutPubkey as unknown as FileItem } ] })).rejects.toThrow(errorText)
  })

  it('throws ParserError if the deposit data file must be in JSON format', async () => {
    const errorText = new ParserError(ErrorTypes.INVALID_JSON_FORMAT)

    await expect(depositDataParser({ ...validInput, data: {} as FileItem[] })).rejects.toThrow(errorText)
    await expect(depositDataParser({ ...validInput, data: '' as unknown as FileItem[] })).rejects.toThrow(errorText)
    await expect(depositDataParser({ ...validInput, data: null as unknown as FileItem[] })).rejects.toThrow(errorText)
    await expect(depositDataParser({ ...validInput, data: undefined as unknown as FileItem[] })).rejects.toThrow(errorText)
  })

  it('throws ParserError if the deposit data file is empty', async () => {
    const errorText = new ParserError(ErrorTypes.EMPTY_FILE)

    await expect(depositDataParser({ ...validInput, data: [] })).rejects.toThrow(errorText)
  })

  it('throws ParserError if the deposit data file has already been uploaded', async () => {

    (requests.getVaultInfo as MockVaultInfo).mockResolvedValue({
      depositDataRoot: '0x9fc6a754977d4e69a51fb5bdbaef88bd46886ec783a8cab34e7963eb7d03aa62',
    })

    const errorText = new ParserError(ErrorTypes.DUPLICATE_DEPOSIT_DATA)

    await expect(depositDataParser(validInput)).rejects.toThrow(errorText)
  })

})

