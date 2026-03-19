import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_SITE_KEY': JSON.stringify('dummy'),
    global: {},
  },
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
