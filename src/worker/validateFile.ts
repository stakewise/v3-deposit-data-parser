import parseJsonFile from './helpers/parseJsonFile'
import type { DepositDataFile, OnError } from './types'


type Input = {
  file: File
  onError: OnError
}

type Output = DepositDataFile | null

const validateFile = async (values: Input): Promise<Output> => {
  const { file, onError } = values

  try {
    const parsedFile = await parseJsonFile(file)

    let error = null

    if (!Array.isArray(parsedFile)) {
      error = 'Deposit data file must be in JSON format'
    }
    else if (parsedFile.length === 0) {
      error = 'Deposit data file is empty'
    }

    if (error) {
      onError(error)
    }

    return parsedFile
  }
  catch (error) {
    console.error(error)

    onError('Deposit data file must be in JSON format')

    return null
  }
}


export default validateFile
