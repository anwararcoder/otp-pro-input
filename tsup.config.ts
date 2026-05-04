import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'adapters/react': 'src/adapters/react.tsx',
    'adapters/vue': 'src/adapters/vue.ts',
    'adapters/vanilla': 'src/adapters/vanilla.ts',
  },
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  external: ['react', 'vue'],
  outExtension({ format }) {
    if (format === 'esm') return { js: '.mjs' };
    if (format === 'cjs') return { js: '.js' };
    return { js: '.global.js' };
  },
});
