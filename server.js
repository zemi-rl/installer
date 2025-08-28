import fs from 'fs';
import https from 'https';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';

const app = express();
const certDir = '/app/certs';

const options = {
  key: fs.readFileSync(path.join(certDir, 'server.key')),
  cert: fs.readFileSync(path.join(certDir, 'server.crt')),
  ca: fs.readFileSync(path.join(certDir, 'ca.crt')),
  requestCert: true,
  rejectUnauthorized: true
};

const FILE_URL = 'https://github.com/zemi-rl/installer/releases/download/release/main.exe';

app.get('/main.exe', async (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send('Unauthorized: Client certificate required');
  }

  console.log(`[INFO] Authorized client downloading from ${FILE_URL}`);

  try {
    const response = await fetch(FILE_URL);
    if (!response.ok) {
      return res.status(response.status).send(`Failed to fetch file: ${response.statusText}`);
    }

    res.setHeader('Content-Disposition', 'attachment; filename="main.exe"');
    res.setHeader('Content-Type', 'application/octet-stream');

    response.body.pipe(res);
  } catch (err) {
    console.error('[ERROR]', err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 443;
https.createServer(options, app).listen(PORT, () => {
  console.log(`[INFO] Mutual TLS server running on port ${PORT}`);
});
