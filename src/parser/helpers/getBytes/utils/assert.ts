import makeError, { CodedEthersError, ErrorInfo, ErrorCode } from './errors'


export const assert: <K extends ErrorCode, T extends CodedEthersError<K>>(
  check: unknown,
  message: string,
  code: K,
  info?: ErrorInfo<T>
) => asserts check = (check, message, code, info) => {
  if (!check) {
    throw makeError(message, code, info)
  }
}

export const assertArgument: (
  check: unknown,
  message: string,
  name: string,
  value: unknown
) => asserts check = (check, message, name, value) => {
  assert(check, message, 'INVALID_ARGUMENT', { argument: name, value })
}

export default assertArgument
