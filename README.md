<p align="center">
  <img src="https://app.stakewise.io/logo512.png" alt="StakeWise Logo" width="100">
</p>

# StakeWise Deposit Data Parser

**StakeWise Deposit Data Parser** is a comprehensive TypeScript package designed to facilitate the processing and validation of deposit data files within blockchain applications. Tailored for developers working on staking platforms, blockchain validators, or any applications requiring meticulous deposit data verification and processing, particularly in the context of the StakeWise ecosystem.

## Features

- **File Validation:** Ensures the input file meets specified criteria, effectively preventing the processing of invalid or corrupted files.
- **Deposit Data Extraction:** Parses deposit data from files, preparing it for further processing or verification.
- **Public Key Verification:** Validates the uniqueness and format of public keys within the deposit data to ensure data integrity.
- **Signature Verification:** Leverages BLS (Boneh-Lynn-Shacham) signatures to authenticate deposit data against given public keys.
- **Progress Callbacks:** Provides real-time feedback on processing progress, suitable for applications processing large datasets.
- **Error Handling:** Implements comprehensive error handling, with custom error types and callback functions for robust error management.

## Installation and Setup
```bash
npm i @stakewise/v3-deposit-data-parser
```

## Usage
```typescript
import { depositDataParser } from '@stakewise/v3-deposit-data-parser'

self.addEventListener('message', async (event) => {
  const { vaultAddress, network, file } = event.data

  const onErrorCallback = (error: Error) => {
    postMessage({ error })
    close()
  }

  const onProgress = (progress: Progress) => {
    postMessage({ progress })
  }

  const result = await depositDataParser(vaultAddress, network, file, onProgress, onErrorCallback)

  postMessage({ result })
  close()
})

```
#### Deposit data parser Arguments:

| Name | Type      | Required | Description                                                                                                                                                                                                                                                                            |
|--------------|-------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| network      | `Network`   | **Yes**  | Network to which the deposit data belongs.                                                                                                                                                                                                                                             |
| vaultAddress | `string`    | **Yes**  | The address of the vault for which the deposit data is being parsed.                                                                                                                                                                                                                   |
| file         | `File`      | **Yes**  | The File interface provides information about files and allows JavaScript in a web page to access their content.                                                                                                                                                                       |
| onProgress   | `Function`  | Optional | Callback function that is called with progress information as the file is being parsed. The function is expected to accept an object with `total` and `value` properties, where `total` is the total number of items to process, and `value` is the current number of items processed. |
| onErrorCallback | `Function` | Optional | Callback function that is called when an error occurs during the parsing process. The function is expected to accept an error object containing `message` and `type` properties and dynamicValues for create custom error messages.                                                    |


#### Parser Errors:
| Type | Message |
|------------|---------|
| `EMPTY_FILE` | Deposit data file is empty
| `INVALID_JSON_FORMAT` | Deposit data file must be in JSON format
| `MERKLE_TREE_GENERATION_ERROR` | Failed to generate the Merkle tree
| `INVALID_PUBLIC_KEY_FORMAT` | Failed to parse deposit data public key
| `MISSING_FIELDS` | Failed to verify the deposit data public keys. Missing fields: {fields}
| `DUPLICATE_PUBLIC_KEYS` | Failed to verify the deposit data public keys. All the entries must be unique.
| `INVALID_SIGNATURE` | Failed to verify the deposit data signatures. Please make sure the file is generated for the {network} network.
