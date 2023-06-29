module.exports = {
    setupFiles: ['<rootDir>/setupTests.js'],
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
      'jest-playwright': {
        browsers: ['chromium', 'firefox', 'webkit'],
        launchOptions: {
          headless: true,
        },
      },
    },
  }
  