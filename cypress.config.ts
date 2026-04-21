import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
