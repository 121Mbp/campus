const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 5173);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const file = path.resolve(root, relative);
    if (file !== path.join(root, 'index.html') && !file.startsWith(path.join(root, 'src') + path.sep)) {
      res.writeHead(404); return res.end('Not found');
    }
    const content = await fs.readFile(file);
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(content);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Query Campus: http://localhost:${port}\nEdit src/app.js or src/style.css, then refresh your browser. Ctrl+C to stop.`));
