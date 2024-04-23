import type { Config } from 'jest'


const config: Config = {
  verbose: true,
  maxWorkers: 1, // Fixed https://github.com/jestjs/jest/issues/11617#issuecomment-1028651059
  rootDir: './src',
  preset: 'ts-jest',
  resetMocks: true,
  testEnvironment: 'node',
  testMatch: [ '**/*.spec.ts' ],
  collectCoverageFrom: [ 'src/**/*.ts' ],
  moduleFileExtensions: [ 'json', 'js', 'ts' ],
  globals: {
    isolatedModules: true,
  },
}


export default config
