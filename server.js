import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.crt')),
    requestCert: false,
    ca: fs.readFileSync(path.join(__dirname, 'ca.crt'))
};

https.createServer(options, (req, res) => {
    if (req.url === '/main.exe') {
        https.get('https://github.com/zemi-rl/installer/releases/download/release/main.exe', (exeRes) => {
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=main.exe'
            });
            exeRes.pipe(res);
        }).on('error', (err) => {
            res.writeHead(500);
            res.end("Error fetching EXE: " + err.message);
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
}).listen(443, () => console.log("[INFO] HTTPS server running on port 443"));
