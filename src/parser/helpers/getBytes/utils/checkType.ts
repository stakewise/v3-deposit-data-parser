const checkType = (value: any, type: string, name: string): void => {
  const types = type.split("|").map(t => t.trim())

  for (let i = 0; i < types.length; i++) {
    switch (type) {
      case "any":
        return
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof(value) === type) { return }
    }
  }

  const error: any = new Error(`invalid value for type ${ type }`)

  error.code = "INVALID_ARGUMENT"
  error.argument = `value.${ name }`
  error.value = value

  throw error
}


export default checkType
