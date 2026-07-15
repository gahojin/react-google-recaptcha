import { defineConfig } from 'rolldown'
import baseConfig, { getInputIndexFiles } from '../../rolldown.base.config.js'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  ...baseConfig,
  external: [/^node:/, /^@types\//, /^react\//, 'react', 'react-dom'],
  input: getInputIndexFiles(pkg.exports),
  platform: 'neutral',
})
