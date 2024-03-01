import stringify from './stringify'
import defineProperties from './defineProperties'


export type ErrorInfo<T> = Omit<T, "code" | "name" | "message">

export type ErrorCode = "BUFFER_OVERRUN" |  "NUMERIC_FAULT" | "INVALID_ARGUMENT"

export interface EthersError<T extends ErrorCode = ErrorCode> extends Error {
  code: ErrorCode;
  info?: Record<string, any>;
  error?: Error;
}

export interface BufferOverrunError extends EthersError<"BUFFER_OVERRUN"> {
  buffer: Uint8Array;
  length: number;
  offset: number;
}

export interface InvalidArgumentError extends EthersError<"INVALID_ARGUMENT"> {
  argument: string;
  value: any;
  info?: Record<string, any>
}

export interface NumericFaultError extends EthersError<"NUMERIC_FAULT"> {
  operation: string;
  fault: string;
  value: any;
}

export type CodedEthersError<T> =
  T extends "BUFFER_OVERRUN" ? BufferOverrunError:
    T extends "NUMERIC_FAULT" ? NumericFaultError:
      T extends "INVALID_ARGUMENT" ? InvalidArgumentError: never;

const makeError = <K extends ErrorCode, T extends CodedEthersError<K>>(
  message: string,
  code: K,
  info?: ErrorInfo<T>
): T => {
  const details: Array<string> = []
  if (info) {
    if ("message" in info || "code" in info || "name" in info) {
      throw new Error(`value will overwrite populated values: ${stringify(info)}`)
    }
    for (const key in info) {
      const value = info[key as keyof ErrorInfo<T>]
      details.push(`${key}=${stringify(value)}`)
    }
  }
  details.push(`code=${code}`)

  if (details.length) {
    message += ` (${details.join(", ")})`
  }

  let error: EthersError
  switch (code) {
    case "INVALID_ARGUMENT":
      error = new TypeError(message) as EthersError
      break
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      error = new RangeError(message) as EthersError
      break
    default:
      error = new Error(message) as EthersError
  }

  defineProperties<EthersError>(error, { code })

  if (info) { Object.assign(error, info) }

  return error as T
}


export default makeError
