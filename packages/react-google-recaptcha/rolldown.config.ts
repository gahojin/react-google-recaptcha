import { defineConfig } from 'rolldown'
import baseConfig from '../../rolldown.base.config.js'

export default defineConfig([
  {
    ...baseConfig,
    plugins: [],
    output: {
      ...baseConfig.output,
      entryFileNames: '[name].development.js',
      cleanDir: true,
    },
    external: [/^node:/, /^@types\//, /^react\//, 'react', 'react-dom', /^rolldown\//],
    input: 'src/index.ts',
    platform: 'neutral',
    transform: {
      define: {
        'process.env.NODE_ENV': "'test'",
      },
    },
  },
  {
    ...baseConfig,
    external: [/^node:/, /^@types\//, /^react\//, 'react', 'react-dom', /^rolldown\//],
    input: 'src/index.js',
    platform: 'neutral',
    transform: {
      define: {
        'process.env.NODE_ENV': "'production'",
      },
    },
  },
])
