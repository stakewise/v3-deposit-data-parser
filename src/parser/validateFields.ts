import { ErrorTypes, createError } from './helpers'

import type { FileItem, OnError } from './types'


type Input = {
  item: FileItem
  onError: OnError
}

const fileFields = [
  'pubkey',
  'signature',
] as const

const validateFields = (values: Input) => {
  const { item, onError } = values

  const missingFields: string[] = []

  fileFields.forEach((field) => {
    const isExist = Object.prototype.hasOwnProperty.call(item, field)

    if (!isExist) {
      missingFields.push(field)
    }
  })

  if (missingFields.length) {
    const error = createError(ErrorTypes.MISSING_FIELDS, { fields: missingFields.join(',') })

    onError(error)
  }
}


export default validateFields
