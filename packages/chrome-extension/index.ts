/// <reference types="bun-types" />
import { ServerWebSocket } from 'bun';
import chokidar from 'chokidar'
import * as fs from 'fs-extra';
import logUpdate from 'log-update';

// 清除
if (fs.existsSync('./extension')) {
  fs.emptyDirSync('./extension');
}

let buildTimes = 0;
let wss = [] as ServerWebSocket<any>[];
const isDevMode = process.argv.includes('--watch');

async function build() {
  fs.copySync('./src', './extension', {
    filter: (file) => !/\.tsx?$/.test(file)
  });
  await Bun.build({
    outdir: './extension',
    define: {
      'process.env.NODE_ENV': JSON.stringify(isDevMode ? "development" : "production"),
    },
    minify: !isDevMode,
    entrypoints: [
      './src/background/index.ts',
      './src/popup/index.tsx',
      './src/options/index.tsx',
      './src/content/index.tsx'
    ],
  });
  wss.forEach(ws => ws.send('reload'));
  buildTimes++;
}

if (!isDevMode) {
  build();
} else {
  Bun.serve({
    port: 8080,
    fetch(req, server) {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) return;
      return new Response("Upgrade failed :(", { status: 500 });
    },
    websocket: {
      open(ws) {
        wss.push(ws);
      },
      message: function (ws: ServerWebSocket<unknown>, message: string | Buffer): void | Promise<void> {
        throw new Error('Function not implemented.');
      },
      close(ws) {
        wss = wss.filter(item => item !== ws);
      }
    },
  });
  // 日志打印
  let index = 0;
  const frames = ['🛫___', '_🛫__', '__🛫_', '___🛫'];
  setInterval(() => {
    const frame = frames[index = ++index % frames.length];
    logUpdate(`${frame} updated times: ${buildTimes}; \n${frame} wss connected: ${wss.length};`);
  }, 100);
  
  // 监听文件变化
  let timeout:any = null;
  let building = false;
  chokidar.watch('./src').on('all', (event, path) => {
    if (building) {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        building = true;
        await build();
        building = false;
      }, 1000);
    } else {
      building = true;
      build().finally(() => building = false);
    }
  });
}


