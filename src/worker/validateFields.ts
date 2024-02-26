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

  let missingFields: string[] = []

  fileFields.forEach((field) => {
    const isExist = item.hasOwnProperty(field)

    if (!isExist) {
      missingFields.push(field)
    }
  })

  if (missingFields.length) {
    const error = `Failed to verify the deposit data public keys. Missing fields: ${missingFields.join(',')}`

    onError(error)
  }
}


export default validateFields
