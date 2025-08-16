module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
		'\\.(svg|png|jpg|jpeg|gif|webp|avif)$': '<rootDir>/test/__mocks__/fileMock.js',
	},
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': ['@swc/jest'],
	},
	testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
}; 