import { assertArgument } from './utils'


type BytesLike = string | Uint8Array

const getBytes = (value: BytesLike): Uint8Array => {
  if (value instanceof Uint8Array) {
    return value
  }

  if (typeof(value) === "string" && value.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const result = new Uint8Array((value.length - 2) / 2)
    let offset = 2
    for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(value.substring(offset, offset + 2), 16)
      offset += 2
    }
    return result
  }

  assertArgument(false, "invalid BytesLike value", "value", value)
}

export default getBytes
