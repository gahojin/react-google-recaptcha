import { defineConfig } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'

export default defineConfig({
  treeshake: {
    moduleSideEffects: false,
  },
  optimization: {
    inlineConst: true,
  },
  experimental: {
    nativeMagicString: true,
  },
  output: [{ dir: 'dist', format: 'es', sourcemap: true, comments: { annotation: true, jsdoc: false, legal: true } }],
  plugins: [
    dts({
      oxc: true,
    }),
  ],
})
