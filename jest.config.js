const config = {
    root: ['<rootDir/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json',
            enableTsDiagnostics: true,
        },
    },
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ['ts', 'tsx', 'js'],
};

module.exports = config;

export default config;
