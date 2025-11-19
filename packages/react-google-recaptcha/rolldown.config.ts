import { defineConfig } from 'rolldown'
import IsolatedDecl from 'unplugin-isolated-decl/rolldown'

export default defineConfig([
  {
    external: [/^node:/, /^@types\//, /^@xstate\//, /^react\//, 'react', 'react-dom', 'xstate'],
    treeshake: true,
    input: 'src/index.ts',
    output: [{ dir: 'dist', format: 'esm', entryFileNames: '[name].mjs', sourcemap: true, cleanDir: true }],
    plugins: [IsolatedDecl()],
  },
])
