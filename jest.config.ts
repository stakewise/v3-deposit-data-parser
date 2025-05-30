import type { Config } from 'jest'


const config: Config = {
  verbose: true,
  maxWorkers: 1, // Fixed https://github.com/jestjs/jest/issues/11617#issuecomment-1028651059
  preset: 'ts-jest',
  resetMocks: true,
  testEnvironment: 'node',
  testMatch: [ '**/*.spec.ts' ],
  collectCoverageFrom: [ 'src/**/*.ts' ],
  moduleFileExtensions: [ 'json', 'js', 'ts' ],
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  globals: {
    isolatedModules: true,
  },
  transformIgnorePatterns: [
    // Dont ignore ESM-modules from @chainsafe
    'node_modules/(?!(?:@chainsafe/ssz|@chainsafe/persistent-merkle-tree|@chainsafe/as-sha256)/)',
  ],
  moduleNameMapper: {
    '^@chainsafe/persistent-merkle-tree$':
      '<rootDir>/node_modules/@chainsafe/persistent-merkle-tree/lib/index.js',
  },
}


export default config
