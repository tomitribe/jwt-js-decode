// import type {Config} from '@jest/types';

const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/dist/',
  ],
  modulePaths: [
    'src',
    'node_modules',
  ],
  collectCoverage: false,
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  preset: 'ts-jest/presets/js-with-babel',
};

module.exports = config;