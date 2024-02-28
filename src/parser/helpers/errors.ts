type DynamicValues = Record<string, any>

export type Error = {
  message: string
  type: ErrorTypes
}

export enum ErrorTypes {
  EMPTY_FILE = 'EMPTY_FILE',
  MISSING_FIELDS = 'MISSING_FIELDS',
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  INVALID_JSON_FORMAT = 'INVALID_JSON_FORMAT',
  DUPLICATE_PUBLIC_KEYS = 'DUPLICATE_PUBLIC_KEYS',
  INVALID_PUBLIC_KEY_FORMAT = 'INVALID_PUBLIC_KEY_FORMAT',
  MERKLE_TREE_GENERATION_ERROR = 'MERKLE_TREE_GENERATION_ERROR',
}

export const ErrorMessages: Record<ErrorTypes, string> = {
  [ErrorTypes.EMPTY_FILE]: 'Deposit data file is empty.',
  [ErrorTypes.INVALID_JSON_FORMAT]: 'Deposit data file must be in JSON format.',
  [ErrorTypes.PROCESSING_ERROR]: 'Error processing deposit data. Please try again.',
  [ErrorTypes.DUPLICATE_PUBLIC_KEYS]: 'Failed to verify the deposit data public keys. All the entries must be unique.',
  [ErrorTypes.INVALID_PUBLIC_KEY_FORMAT]: 'Failed to parse deposit data public key',
  [ErrorTypes.MERKLE_TREE_GENERATION_ERROR]: 'Failed to generate the Merkle tree',
  [ErrorTypes.MISSING_FIELDS]: 'Failed to verify the deposit data public keys. Missing fields: {missingFields}',
  [ErrorTypes.INVALID_SIGNATURE]: `
    Failed to verify the deposit data signatures. Please make sure the file is generated for the {network} network.
  `,
}

const createError = (type: ErrorTypes, dynamicValues?: DynamicValues): Error => {
  let message = ErrorMessages[type]

  if (dynamicValues) {
    Object.keys(dynamicValues).forEach(key => {
      message = message.replace(`{${key}}`, dynamicValues[key])
    })
  }

  return { message, type }
}


export default createError
