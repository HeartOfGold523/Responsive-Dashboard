/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!@mui/x-charts/)"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^@/api$": "<rootDir>/app/api/index.ts",
    "^@/components$": "<rootDir>/app/components/index.ts",
    "^@/contexts$": "<rootDir>/app/contexts/index.ts",
    "^@/types$": "<rootDir>/app/types/index.ts",
    "^@/utils$": "<rootDir>/app/utils/index.ts",
  },
};
