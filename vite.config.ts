/* eslint-env node */
import { defineConfig } from 'vite';
import { resolve } from 'path';

import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'package.json',
          dest: '.',
        },
        {
          src: 'LICENSE',
          dest: '.',
        },
        {
          src: 'README.md',
          dest: '.',
        },
        {
          src: 'web-types.json',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'velours',
      formats: ['es', 'umd'],
      fileName: format => `velours.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: { globals: { vue: 'Vue' } },
    },
  },
});
