const http = require('http')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'application/image/svg+xml'
}

http.createServer((req, res) => {
  const url = req.url
  const filePath = url === '/' ?
    path.resolve(root, 'public', 'index.html') :
    path.resolve(root, ...url.split('/'))

  console.log({ filePath, url })

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': contentType })
      res.end(error.message)
      res.end()

      console.error({ error })
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
}).listen(9090)


