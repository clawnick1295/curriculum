/* Shared teacher edits for the /alt2/ timeline.
   Uses the same Apps Script and passcode as the main site (DA_CONFIG.EDIT_API_URL).
   Keys are prefixed with "alt2:" so they never overwrite a main-site edit in the Sheet. */
(function(){
const LS = "da-edits-alt2-v1", PASS = "da-edit-pass", QUEUE = "da-edits-alt2-queue";
const url = () => ((window.DA_CONFIG && DA_CONFIG.EDIT_API_URL) || "").trim();
const readJSON = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let remoteLoaded = false, remoteLoading = null, editing = false, curAge = "", curWeek = 9, bound = false;

function all(){ return readJSON(LS, {}); }
function setLocal(key, value){
  const m = all();
  if (value === null) delete m[key]; else m[key] = value;
  writeJSON(LS, m);
}
function onlyAlt2(edits){
  const o = {};
  Object.keys(edits || {}).forEach(k => { if (k.indexOf("alt2:") === 0) o[k] = edits[k]; });
  return o;
}
function pendingValues(q){
  const o = {};
  Object.keys(q).forEach(k => { if (q[k] !== null) o[k] = q[k]; });
  return o;
}
function loadRemote(){
  if (!url() || remoteLoaded) return Promise.resolve();
  if (remoteLoading) return remoteLoading;
  remoteLoading = fetch(url() + (url().includes("?") ? "&" : "?") + "action=list", {cache: "no-store"})
    .then(r => r.json()).then(j => {
      if (j && j.edits) {
        const q = readJSON(QUEUE, {});
        writeJSON(LS, Object.assign(onlyAlt2(j.edits), pendingValues(q)));
      }
      remoteLoaded = true;
    }).catch(() => {}).finally(() => { remoteLoading = null; });
  return remoteLoading;
}
function post(body){
  return fetch(url(), {method: "POST", headers: {"Content-Type": "text/plain;charset=utf-8"}, body: JSON.stringify(body)}).then(r => r.json());
}
function status(msg){ const s = document.getElementById("edit-status"); if (s) s.textContent = msg; }
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
function prefix(){ return curAge ? "alt2:" + curAge + ":w" + curWeek + ":" : ""; }
function nodes(){ return Array.from(document.querySelectorAll("#app [data-ed]")); }
function apply(){
  const m = all(), p = prefix();
  if (!p) return;
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
    if (on) {
      el.setAttribute("contenteditable", "plaintext-only");
      if (el.contentEditable !== "plaintext-only") el.setAttribute("contenteditable", "true");
    } else el.removeAttribute("contenteditable");
  });
  const b = document.getElementById("edit-toggle");
  if (b) b.textContent = on ? "✅ Done editing" : "✏️ Edit";
  const bar = document.getElementById("edit-bar");
  if (bar) bar.hidden = !on;
  if (on) status(url() ? "Edits are shared with all teachers." : "Edits save on this device only.");
}
function askPass(){
  if (!url()) return true;
  if (localStorage.getItem(PASS)) return true;
  const p = prompt("Teacher passcode to edit this plan:");
  if (!p) return false;
  localStorage.setItem(PASS, p.trim());
  return true;
}
function resetRoom(){
  if (!curAge) return;
  if (!confirm("Reset this classroom back to the original plan? This removes its edits" + (url() ? " for everyone." : " on this device."))) return;
  const m = all(), p = prefix();
  Object.keys(m).filter(k => k.startsWith(p)).forEach(k => save(k, null));
  apply();
}
function bind(){
  if (bound) return;
  bound = true;
  const app = document.getElementById("app");
  const toggle = document.getElementById("edit-toggle");
  const reset = document.getElementById("edit-reset");
  if (toggle) toggle.onclick = () => {
    if (!curAge) return;
    if (!editing && !askPass()) return;
    setEditing(!editing);
  };
  if (reset) reset.onclick = resetRoom;
  if (app) {
    app.addEventListener("focusout", e => {
      const el = e.target.closest && e.target.closest("[data-ed]");
      if (!el || !editing || !curAge) return;
      const v = el.textContent.replace(/\s+/g, " ").trim();
      const orig = el.getAttribute("data-orig");
      const key = prefix() + el.dataset.ed;
      const prev = all()[key];
      const next = !v || v === orig ? null : v;
      if ((prev || null) === next) return;
      save(key, next);
      if (!v) el.textContent = orig;
      el.classList.toggle("is-edited", !!next);
    });
    app.addEventListener("keydown", e => {
      if (editing && e.key === "Enter" && e.target.closest && e.target.closest("[data-ed]")) {
        e.preventDefault();
        e.target.blur();
      }
    });
  }
  window.addEventListener("online", flushQueue);
}
window.ALT2Edit = {
  mount(ageId, weekN){
    curAge = ageId || "";
    curWeek = weekN || 9;
    bind();
    const b = document.getElementById("edit-toggle");
    if (b) b.hidden = !curAge;
    if (!curAge) { setEditing(false); return; }
    apply();
    loadRemote().then(() => { if (curAge === ageId && curWeek === (weekN || 9)) apply(); });
    flushQueue();
    if (editing) setEditing(true);
  }
};
})();
