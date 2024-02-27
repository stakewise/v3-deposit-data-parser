<p align="center">
  <img src="https://app.stakewise.io/logo512.png" alt="StakeWise Logo" width="100">
</p>

# StakeWise Deposit Data Parser

 // TODO add description

## Installation and Setup
```bash
npm i @stakewise/v3-deposit-data-parser
```

// TODO add step to install

```typescript
import {  } from '@stakewise/v3-deposit-data-parser'

// TODO add example

```
#### Deposit data parser Arguments:

| Name | Type | Type | Description |
|------|------|-------------|---------|
| network | `Network` | **Require** | Network

//TODO add arguments


```

```
#### Worker Errors:
| Type | Message |
|------------|---------|
| `EMPTY_FILE` | Deposit data file is empty
| `INVALID_JSON_FORMAT` | Deposit data file must be in JSON format
| `MERKLE_TREE_GENERATION_ERROR` | Failed to generate the Merkle tree
| `INVALID_PUBLIC_KEY_FORMAT` | Failed to parse deposit data public key
| `MISSING_FIELDS` | Failed to verify the deposit data public keys. Missing fields: {missingFields}
| `DUPLICATE_PUBLIC_KEYS` | Failed to verify the deposit data public keys. All the entries must be unique.
| `INVALID_SIGNATURE` | Failed to verify the deposit data signatures. Please make sure the file is generated for the {networkNames} network.
