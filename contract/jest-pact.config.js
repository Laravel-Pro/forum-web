module.exports = {
  setupFiles: ['./pactSetup.js'],
  setupFilesAfterEnv: ['./pactTestWrapper.js'],
  testEnvironment: 'node'
};
