import { ErrorTypes, createError } from './helpers'

import type { FileItem } from './types'


type Input = {
  item: FileItem
}

const fileFields = [
  'pubkey',
  'signature',
] as const

const validateFields = (values: Input) => {
  const { item } = values

  const missingFields: string[] = []

  fileFields.forEach((field) => {
    const isExist = Object.prototype.hasOwnProperty.call(item, field)

    if (!isExist) {
      missingFields.push(field)
    }
  })

  if (missingFields.length) {
    const error = createError(ErrorTypes.MISSING_FIELDS, { fields: missingFields.join(',') })

    throw (error)
  }
}


export default validateFields
