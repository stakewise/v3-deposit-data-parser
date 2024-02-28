import { createError, parseJsonFile, ErrorTypes } from './helpers'

import type { DepositDataFile } from './types'


type Input = {
  file: File
}

const JsonError = createError(ErrorTypes.INVALID_JSON_FORMAT)

const validateFile = (values: Input): Promise<DepositDataFile> => {
  const { file } = values

  return parseJsonFile(file)
    .then((parsedFile) => {
      if (!Array.isArray(parsedFile)) {
        return Promise.reject(JsonError)
      }
      else if (parsedFile.length === 0) {
        return Promise.reject(createError(ErrorTypes.EMPTY_FILE))
      }

      return parsedFile
    }, (error) => {
      console.error(error)

      return Promise.reject(error)
    })
}


export default validateFile
