import { defineConfig } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'

export default defineConfig([
  {
    external: [/^node:/, /^@types\//, /^@xstate\//, /^react\//, 'react', 'react-dom', 'xstate'],
    treeshake: true,
    input: 'src/index.ts',
    output: [{ dir: 'dist', format: 'es', sourcemap: true, cleanDir: true }],
    plugins: [dts()],
  },
])
