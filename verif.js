// Lance une page en Chrome headless et rend le contenu du <pre> de resultat.
// node verif.js examen_clinique.html
const { spawn } = require("child_process");
const path = require("path");

const file = "file://" + path.resolve(process.argv[2]) + "?selftest=1";
const port = 9333;
const prof = "/tmp/chrome-verif-" + process.pid;

const chrome = spawn("google-chrome", [
  "--headless=new", "--no-sandbox", "--disable-gpu",
  "--remote-debugging-port=" + port, "--user-data-dir=" + prof, "about:blank"
], { stdio: "ignore" });

const sortir = (code, msg) => { if (msg) console.log(msg); chrome.kill(); process.exit(code); };

(async () => {
  let cible;
  for (let i = 0; i < 60; i++) {
    try { cible = await (await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(file)}`, { method: "PUT" })).json(); break; }
    catch { await new Promise(r => setTimeout(r, 250)); }
  }
  if (!cible) sortir(1, "Chrome injoignable");

  const ws = new WebSocket(cible.webSocketDebuggerUrl);
  let n = 0;
  const attente = new Map();
  const envoyer = (method, params) => new Promise(res => { const id = ++n; attente.set(id, res); ws.send(JSON.stringify({ id, method, params })); });

  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && attente.has(m.id)) { attente.get(m.id)(m.result); attente.delete(m.id); } };
  ws.onopen = async () => {
    await envoyer("Runtime.enable");
    for (let i = 0; i < 60; i++) {
      const r = await envoyer("Runtime.evaluate", {
        expression: "(document.querySelector('body > pre') || {}).textContent || ''", returnByValue: true
      });
      const t = r.result && r.result.value;
      if (t) sortir(t.startsWith("OK") ? 0 : 1, t);
      await new Promise(r => setTimeout(r, 500));
    }
    sortir(1, "Aucun resultat apres 30 s");
  };
})();
