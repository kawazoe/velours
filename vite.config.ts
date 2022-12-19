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
    dts(),
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
      entry: {
        'velours': resolve(__dirname, 'src/index.ts'),
        'stores/index': resolve(__dirname, 'src/stores/index.ts'),
      },
      name: '[name]',
      formats: ['es'],
      fileName: '[name].[format]',
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        globals: { vue: 'Vue' },
        // manualChunks: {
        //   'components': ['./components'],
        //   'composables': ['./composables'],
        // },
        // manualChunks: id => {
        //   console.log(id);
        //   return 'test';
        // },
      },
    },
  },
});
