const stringify = (value: any): any => {
  if (value == null) {
    return "null"
  }

  if (Array.isArray(value)) {
    return "[ " + (value.map(stringify)).join(", ") + " ]"
  }

  if (value instanceof Uint8Array) {
    const HEX = "0123456789abcdef"

    let result = "0x"

    for (let i = 0; i < value.length; i++) {
      result += HEX[value[i] >> 4]
      result += HEX[value[i] & 0xf]
    }

    return result
  }

  if (typeof(value) === 'object' && typeof(value.toJSON) === 'function') {
    return stringify(value.toJSON())
  }

  switch (typeof(value)) {
    case 'boolean':
    case 'symbol':
      return value.toString()
    case 'bigint':
      return BigInt(value).toString()
    case 'number':
      return (value).toString()
    case 'string':
      return JSON.stringify(value)
    case 'object': {
      const keys = Object.keys(value)
      keys.sort()

      return '{ " + keys.map((k) => `${ stringify(k) }: ${ stringify(value[k]) }`).join(", ") + " }'
    }
  }

  return `[ COULD NOT SERIALIZE ]`
}


export default stringify
