import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          globals: true,
          include: ['**/*.{test,spec}.{ts,tsx}'],
          exclude: ['**/node_modules', '**/*.browser.{test,spec}.{ts,tsx}'],
          name: 'unit',
          environment: 'node',
        },
      },
    ],
    setupFiles: ['../../vitest.setup.ts'],
  },
})
