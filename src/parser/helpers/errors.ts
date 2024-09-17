type DynamicValues = Record<string, any>

export enum ErrorTypes {
  EMPTY_FILE = 'EMPTY_FILE',
  MISSING_FIELDS = 'MISSING_FIELDS',
  EIGEN_PODS_EMPTY = 'EIGEN_PODS_EMPTY',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  INVALID_JSON_FORMAT = 'INVALID_JSON_FORMAT',
  DUPLICATE_PUBLIC_KEYS = 'DUPLICATE_PUBLIC_KEYS',
  DUPLICATE_DEPOSIT_DATA = 'DUPLICATE_DEPOSIT_DATA',
  INVALID_WITHDRAW_ADDRESS = 'INVALID_WITHDRAW_ADDRESS',
  INVALID_PUBLIC_KEY_FORMAT = 'INVALID_PUBLIC_KEY_FORMAT',
  MERKLE_TREE_GENERATION_ERROR = 'MERKLE_TREE_GENERATION_ERROR',
}

export const ErrorMessages: Record<ErrorTypes, string> = {
  [ErrorTypes.EMPTY_FILE]: 'Deposit data file is empty.',
  [ErrorTypes.EIGEN_PODS_EMPTY]: 'No Eigen pods in the Vault',
  [ErrorTypes.INVALID_JSON_FORMAT]: 'Deposit data file must be in JSON format.',
  [ErrorTypes.MERKLE_TREE_GENERATION_ERROR]: 'Failed to generate the Merkle tree',
  [ErrorTypes.INVALID_PUBLIC_KEY_FORMAT]: 'Failed to parse deposit data public key',
  [ErrorTypes.DUPLICATE_DEPOSIT_DATA]: `The deposit data file has already been uploaded.`,
  [ErrorTypes.INVALID_WITHDRAW_ADDRESS]: `The withdrawal addresses don’t match Eigen pods`,
  [ErrorTypes.MISSING_FIELDS]: 'Failed to verify the deposit data public keys. Missing fields: {fields}',
  [ErrorTypes.DUPLICATE_PUBLIC_KEYS]: 'Failed to verify the deposit data public keys. All the entries must be unique.',
  [ErrorTypes.INVALID_SIGNATURE]: `
    Failed to verify the deposit data signatures. Please make sure the file is generated for the {network} network.
  `,
}

class ParserError extends Error {
  public title: string
  public type: ErrorTypes
  public dynamicValues?: DynamicValues

  constructor(type: ErrorTypes, dynamicValues?: DynamicValues) {
    const message = ParserError.formatMessage(type, dynamicValues)

    super(message)

    this.type = type
    this.title = message
    this.name = 'StakeWise Parser Error'
    this.dynamicValues = dynamicValues
  }

  private static formatMessage(type: ErrorTypes, dynamicValues?: DynamicValues): string {
    let message = ErrorMessages[type]

    if (dynamicValues) {
      Object.keys(dynamicValues).forEach((key) => {
        message = message.replace(`{${key}}`, dynamicValues[key])
      })
    }

    return message
  }
}

export default ParserError
