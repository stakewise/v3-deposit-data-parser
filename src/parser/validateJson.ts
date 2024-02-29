import { ParserError, ErrorTypes } from './helpers'

import type { DepositDataFile } from './types'


type Input = {
  data: DepositDataFile
}

const validateJson = (values: Input): DepositDataFile => {
  const { data } = values

  if (!Array.isArray(data)) {
    throw new ParserError(ErrorTypes.INVALID_JSON_FORMAT)
  }

  else if (data.length === 0) {
    throw new ParserError(ErrorTypes.EMPTY_FILE)
  }

  return data
}


export default validateJson
