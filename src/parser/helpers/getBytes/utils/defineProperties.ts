import checkType from './checkType'


const defineProperties = <T>(
  target: T,
  values: { [K in keyof T]?: T[K] },
  types?: { [K in keyof T]?: string }
): void => {
  for (const key in values) {
    const value = values[key]

    const type = types ? types[key] : null

    if (type) {
      checkType(value, type, key)
    }

    Object.defineProperty(target, key, { enumerable: true, value, writable: false })
  }
}


export default defineProperties
