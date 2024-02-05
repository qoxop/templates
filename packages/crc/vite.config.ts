import fs from 'fs-extra';
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const outDir = resolve(__dirname, './extension');
const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
  // 
}

// 清空目录
fs.emptyDirSync(outDir);
// 拷贝图标
fs.copySync('src/assets/icons', 'extension/assets/icons');
fs.copyFileSync('src/manifest.json', 'extension/manifest.json');


// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  root: './src',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, './extension'),

    rollupOptions: {
      input: {
        options: resolve(__dirname, 'src/options.html'),
        popup: resolve(__dirname, 'src/popup.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        entryFileNames: (info) => {
          return /\.html$/.test(info.facadeModuleId) ? `scripts/${info.name}-[hash].js` : `${info.name}.js`;
        },
      }
    },
  },
})
