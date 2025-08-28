# single_server.py
# Python HTTPS server to serve a private EXE download
# Requirements: pip install flask requests

from flask import Flask, send_file, Response
import requests
import ssl
import io

app = Flask(__name__)

# Config: GitHub EXE URL
EXE_URL = "https://github.com/zemi-rl/download/releases/download/main/main.exe"

# Self-signed certificate & key
CERT_FILE = "server.crt"
KEY_FILE = "server.key"

@app.route("/main.exe")
def download_exe():
    try:
        # Fetch the EXE from GitHub
        r = requests.get(EXE_URL, stream=True)
        r.raise_for_status()
        exe_data = io.BytesIO(r.content)

        # Send EXE as downloadable file
        return send_file(
            exe_data,
            as_attachment=True,
            download_name="main.exe",
            mimetype="application/octet-stream"
        )
    except Exception as e:
        return Response(f"Error fetching EXE: {str(e)}", status=500)

@app.route("/")
def index():
    return "<h2>Private EXE server is running. Use /main.exe to download.</h2>"

if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    
    print("[INFO] HTTPS server running on https://0.0.0.0:443")
    app.run(host="0.0.0.0", port=443, ssl_context=context)
