<p align="center">
  <img src="https://app.stakewise.io/logo512.png" alt="StakeWise Logo" width="100">
</p>

# StakeWise Deposit Data Parser

**StakeWise Deposit Data Parser** is a comprehensive TypeScript package designed to facilitate the processing and validation of deposit data files within blockchain applications. Tailored for developers working on staking platforms, blockchain validators, or any applications requiring meticulous deposit data verification and processing, particularly in the context of the StakeWise ecosystem.

![Version](https://img.shields.io/npm/v/@stakewise/v3-deposit-data-parser)
![Size](https://img.shields.io/bundlephobia/min/@stakewise/v3-deposit-data-parser?label=Size)

## Features

- **Json Validation:** Ensures the input data meets specified criteria, effectively preventing the processing of invalid or corrupted json.
- **Deposit Data Extraction:** Parses deposit data from files, preparing it for further processing or verification.
- **Public Key Verification:** Validates the uniqueness and format of public keys within the deposit data to ensure data integrity.
- **Signature Verification:** Leverages BLS (Boneh-Lynn-Shacham) signatures to authenticate deposit data against given public keys.
- **Progress Callbacks:** Provides real-time feedback on processing progress, suitable for applications processing large datasets.
- **Error Handling:** Implements comprehensive error handling, with custom error types and callback functions for robust error management.
- **Withdrawal Address Verification:** The verification is carried out to confirm that the Withdrawal Address is included in the deposit data and that it matches any of the eigen pods addresses that we request directly for the restake vault.
## Installation and Setup
```bash
npm i @stakewise/v3-deposit-data-parser
```

## Usage example
To ensure optimal performance and responsiveness, **StakeWise Deposit Data Parser** is optimized for execution within a Web Worker. This allows your application to process data without blocking the main thread, keeping the UI smooth and responsive, even during intensive computations.

```typescript
import { depositDataParser } from '@stakewise/v3-deposit-data-parser'

self.addEventListener('message', async (event) => {
  const { vaultAddress, network, file } = event.data

  try {
    const onProgress = (progress: Progress) => {
      postMessage({ progress })
    }

    const result = await depositDataParser({
      data,
      vaultAddress,
      network,
      onProgress,
    })

    postMessage({ result })
  }
  catch (error) {
    if (error instanceof ParserError) {
      const parserError: ParserError = { ...error }
      
      postMessage({ error: parserError })
    }
    else {
      postMessage({ error })
    }
  }
  finally {
    close()
  }
})

```
#### Deposit data parser Arguments:

| Name         | Type      | Required | Description                                                                                                                                                                                                                                                                            |
|--------------|-------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| network      | `Network`   | **Yes**  | Network to which the deposit data belongs.                                                                                                                                                                                                                                             |
| vaultAddress | `string`    | **Yes**  | The address of the vault for which the deposit data is being parsed.                                                                                                                                                                                                                   |
| data         | `DepositDataFile` | **Yes**  | Data that contains basic information about the file to be downloaded.                                                                                                                                                                                                                  |
| onProgress   | `Function`  | Optional | Callback function that is called with progress information as the file is being parsed. The function is expected to accept an object with `total` and `value` properties, where `total` is the total number of items to process, and `value` is the current number of items processed. |


#### Parser Errors:
| Type | Message |
|------------|---------|
| `EMPTY_FILE` | Deposit data file is empty
| `EIGEN_PODS_EMPTY` | No Eigen pods in the Vault
| `INVALID_JSON_FORMAT` | Deposit data file must be in JSON format
| `MERKLE_TREE_GENERATION_ERROR` | Failed to generate the Merkle tree
| `INVALID_PUBLIC_KEY_FORMAT` | Failed to parse deposit data public key
| `DUPLICATE_DEPOSIT_DATA` | The deposit data file has already been uploaded. 
| `INVALID_WITHDRAW_ADDRESS` | The withdrawal addresses don’t match Eigen pods
| `MISSING_FIELDS` | Failed to verify the deposit data public keys. Missing fields: {fields}
| `DUPLICATE_PUBLIC_KEYS` | Failed to verify the deposit data public keys. All the entries must be unique.
| `INVALID_SIGNATURE` | Failed to verify the deposit data signatures. Please make sure the file is generated for the {network} network.
