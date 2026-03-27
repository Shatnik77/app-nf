import type { ProxyOptions } from 'vite';

const HOST = 'http://localhost:4200';
const REMOTE = 'http://localhost:4202';
const REMOTE_APP_NAME = 'remote-app';

const PROXY_CONFIG: Record<string, ProxyOptions> = {
  '/federation.manifest.json': {
    target: HOST,
    changeOrigin: true,
    secure: false,
    selfHandleResponse: true,
    configure: (proxy, options) => {
      proxy.on('proxyRes', (proxyRes, req, res) => {
          let body = Buffer.from([]);
          proxyRes.on('data', (chunk) => body = Buffer.concat([body, chunk]));
          proxyRes.on('end', () => {
            try {
              const json = JSON.parse(body.toString());
              // add remote
              json['remote-app'] = `/remotes/${REMOTE_APP_NAME}/remoteEntry.json`;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(json));
            } catch (e) { res.end(body); }
          });
      })
      proxy.on('error', (err) => console.error('[Proxy] Error:', err))
    }
  },
  [`^/remotes/${REMOTE_APP_NAME}`]: {
    target: REMOTE,
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(new RegExp(`^/remotes/${REMOTE_APP_NAME}`), ''),
  },
  '/**': {
      target: HOST,
      changeOrigin: true,
      secure: false,
      ws: true,
  }
}

module.exports = PROXY_CONFIG;
