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
    const error = `Failed to verify the deposit data public keys. Missing fields: ${missingFields.join(',')}`

    onError({
      message: error,
      type: 'MISSING_FIELDS',
    })
  }
}


export default validateFields
