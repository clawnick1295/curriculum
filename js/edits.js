/* Teacher edits for week pages.
   - Every element with data-ed="…" on a week page can be edited after tapping ✏️ Edit.
   - Shared mode: when DA_CONFIG.EDIT_API_URL is set (Google Apps Script web app + Google Sheet, see tools/),
     edits are saved to the Sheet and every iPad/phone sees them. The Sheet script checks a passcode that lives
     only in the script's Script Properties, never in this public repo.
   - Offline / no URL: edits are kept in this device's localStorage and re-sent next time when shared mode is on. */
(function(){
const LS = "da-edits-v1", PASS = "da-edit-pass", QUEUE = "da-edits-queue";
const url = () => ((window.DA_CONFIG && DA_CONFIG.EDIT_API_URL) || "").trim();
const readJSON = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let remoteLoaded = false, remoteLoading = null, editing = false, cur = null;

function all(){ return readJSON(LS, {}); }
function setLocal(key, value){ const m = all(); if (value === null) delete m[key]; else m[key] = value; writeJSON(LS, m); }

function loadRemote(){
  if (!url() || remoteLoaded) return Promise.resolve();
  if (remoteLoading) return remoteLoading;
  remoteLoading = fetch(url() + (url().includes("?") ? "&" : "?") + "action=list", {cache: "no-store"})
    .then(r => r.json()).then(j => {
      if (j && j.edits) { const q = readJSON(QUEUE, {}); const m = Object.assign({}, j.edits, pendingValues(q)); writeJSON(LS, m); }
      remoteLoaded = true;
    }).catch(() => {}).finally(() => { remoteLoading = null; });
  return remoteLoading;
}
function pendingValues(q){ const o = {}; Object.keys(q).forEach(k => { if (q[k] !== null) o[k] = q[k]; }); return o; }

function post(body){
  return fetch(url(), {method: "POST", headers: {"Content-Type": "text/plain;charset=utf-8"}, body: JSON.stringify(body)}).then(r => r.json());
}
function flushQueue(){
  if (!url()) return Promise.resolve();
  const q = readJSON(QUEUE, {}), keys = Object.keys(q), pass = localStorage.getItem(PASS) || "";
  if (!keys.length || !pass) return Promise.resolve();
  const items = keys.map(k => ({key: k, value: q[k] === null ? "" : q[k]}));
  return post({action: "save", pass, items}).then(j => {
    if (j && j.ok) writeJSON(QUEUE, {});
    else if (j && j.error === "bad-pass") { localStorage.removeItem(PASS); status("Wrong passcode. Tap Edit to try again."); }
  }).catch(() => status("Offline. Edits saved on this iPad and will sync later."));
}
function save(key, value){
  setLocal(key, value);
  if (!url()) { status("Saved on this device."); return; }
  const q = readJSON(QUEUE, {}); q[key] = value; writeJSON(QUEUE, q);
  status("Saving…");
  flushQueue().then(() => { if (!Object.keys(readJSON(QUEUE, {})).length) status("Saved for everyone ✓"); });
}

function status(msg){ const s = document.getElementById("edit-status"); if (s) s.textContent = msg; }
function prefix(){ return cur ? cur.age + "/" + cur.week + "/" : ""; }
function nodes(){ return Array.from(document.querySelectorAll("#week-template [data-ed]")); }

function apply(){
  const m = all(), p = prefix();
  nodes().forEach(el => {
    if (!el.hasAttribute("data-orig")) el.setAttribute("data-orig", el.textContent);
    const v = m[p + el.dataset.ed];
    el.textContent = typeof v === "string" && v !== "" ? v : el.getAttribute("data-orig");
    el.classList.toggle("is-edited", typeof v === "string" && v !== "");
  });
}
function setEditing(on){
  editing = on;
  document.body.classList.toggle("editing", on);
  nodes().forEach(el => {
    if (on) { el.setAttribute("contenteditable", "plaintext-only"); if (el.contentEditable !== "plaintext-only") el.setAttribute("contenteditable", "true"); }
    else el.removeAttribute("contenteditable");
  });
  const b = document.getElementById("edit-toggle"); if (b) b.textContent = on ? "✅ Done editing" : "✏️ Edit";
  const bar = document.getElementById("edit-bar"); if (bar) bar.hidden = !on;
}
function askPass(){
  if (!url()) return true; // device-only mode: nothing shared, nothing to protect
  if (localStorage.getItem(PASS)) return true;
  const p = prompt("Teacher passcode to edit this plan:");
  if (!p) return false;
  localStorage.setItem(PASS, p.trim());
  return true;
}
function resetWeek(){
  if (!confirm("Reset this week back to the original plan? This removes all edits on this week" + (url() ? " for everyone." : " on this device."))) return;
  const m = all(), p = prefix();
  Object.keys(m).filter(k => k.startsWith(p)).forEach(k => save(k, null));
  apply();
}

DA.edits = {
  mount(age, week){
    cur = {age, week};
    const page = document.getElementById("week-template");
    if (!page) return;
    apply();
    loadRemote().then(() => { if (cur && cur.age === age && cur.week === week) apply(); });
    flushQueue();
    const tb = document.getElementById("edit-toggle");
    if (tb) {
      const bar = document.createElement("div");
      bar.id = "edit-bar"; bar.className = "card editbar no-print"; bar.hidden = true;
      bar.innerHTML = `<p><b>Editing.</b> Tap any text to change it. Changes save when you tap away. <span id="edit-status">${url() ? "Edits are shared with all teachers." : "Edits save on this device only."}</span></p><button class="btn ghost" type="button" id="edit-reset">↺ Reset this week</button>`;
      tb.closest(".toolbar").after(bar);
      bar.querySelector("#edit-reset").onclick = resetWeek;
      tb.onclick = () => { if (!editing && !askPass()) return; setEditing(!editing); };
    }
    page.addEventListener("focusout", e => {
      const el = e.target.closest && e.target.closest("[data-ed]");
      if (!el || !editing) return;
      const v = el.textContent.replace(/\s+/g, " ").trim(), orig = el.getAttribute("data-orig");
      const key = prefix() + el.dataset.ed, prev = all()[key];
      const next = !v || v === orig ? null : v;
      if ((prev || null) === next) return;
      save(key, next);
      if (!v) el.textContent = orig;
      el.classList.toggle("is-edited", !!next);
    });
    page.addEventListener("keydown", e => { if (editing && e.key === "Enter" && e.target.closest("[data-ed]")) { e.preventDefault(); e.target.blur(); } });
    setEditing(false);
  }
};
window.addEventListener("online", flushQueue);
})();
