import parseJsonFile from './helpers/parseJsonFile'
import type { DepositDataFile, OnError, Error } from './types'


type Input = {
  file: File
  onError: OnError
}

type Output = DepositDataFile | null

const JsonError: Error = {
  message: 'Deposit data file must be in JSON format',
  type: 'INVALID_JSON_FORMAT',
}

const validateFile = async (values: Input): Promise<Output> => {
  const { file, onError } = values

  try {
    const parsedFile = await parseJsonFile(file)

    let error: Error | null = null

    if (!Array.isArray(parsedFile)) {
      error = JsonError
    }
    else if (parsedFile.length === 0) {
      error = {
        message: 'Deposit data file is empty',
        type: 'EMPTY_FILE',
      }
    }

    if (error) {
      onError(error)
    }

    return parsedFile
  }
  catch (error) {
    console.error(error)

    onError(JsonError)

    return null
  }
}


export default validateFile
