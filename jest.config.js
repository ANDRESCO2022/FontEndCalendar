export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transform: {
    //'^.+\\.m?js$': 'babel-jest'
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)'
  ],
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/tests/mocks/styleMock.js'
  }
}
