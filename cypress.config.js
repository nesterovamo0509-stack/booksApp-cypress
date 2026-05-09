const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      mail: 'test@test.com',
      pass: 'test',
    },
    setupNodeEvents(on, config) {},
  },
});