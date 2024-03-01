import makeError, { CodedEthersError, ErrorInfo, ErrorCode } from './errors'


export function assert<K extends ErrorCode, T extends CodedEthersError<K>>(check: unknown, message: string, code: K, info?: ErrorInfo<T>): asserts check {
  if (!check) { throw makeError(message, code, info) }
}

export function assertArgument(check: unknown, message: string, name: string, value: unknown): asserts check {
  assert(check, message, "INVALID_ARGUMENT", { argument: name, value: value })
}


export default assertArgument
