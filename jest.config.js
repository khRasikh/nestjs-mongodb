module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['**/src/**/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: 'coverage/',
  coverageReporters: [
    ['lcov', { projectRoot: '../' }],
    'json',
    'clover',
    'text',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'interface',
    '.module.ts',
    '<rootDir>/src/app/main.ts',
    '.mock.ts',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: { 'src/(.*)$': '<rootDir>/src/$1' },
};
