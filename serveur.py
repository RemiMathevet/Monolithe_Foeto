# SPDX-License-Identifier: CC-BY-NC-SA-4.0
"""Sert public/ sur 5075. Les modules partent en octet-stream, pas en text/html.

Cloudflare injecte un lien piege anti-bot dans toute reponse text/html
(<a href="/cdn-cgi/content?id=..."> cache, unique a chaque requete). Le fichier
recu ne serait donc plus celui publie : son empreinte sha ne correspondrait pas
a celle annoncee, et un document cense fonctionner hors reseau embarquerait une
URL distante. En octet-stream, Cloudflare ne touche a rien.

Seul index.html reste en text/html, pour s'afficher.
"""

import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PUBLIC = str(Path(__file__).parent / "public")
PORT = 5075


class Handler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith(".html") and Path(path).name != "index.html":
            return "application/octet-stream"
        return super().guess_type(path)

    def end_headers(self):
        if self.path.endswith(".html") and not self.path.rstrip("/").endswith("index.html"):
            self.send_header("Content-Disposition",
                             'attachment; filename="%s"' % Path(self.path).name)
        super().end_headers()


if __name__ == "__main__":
    srv = ThreadingHTTPServer(("127.0.0.1", PORT),
                              functools.partial(Handler, directory=PUBLIC))
    print("Hub Light sur http://127.0.0.1:%d — %s" % (PORT, PUBLIC), flush=True)
    srv.serve_forever()
