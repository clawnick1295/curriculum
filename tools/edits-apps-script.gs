/* Davie Academy curriculum: shared teacher edits.
   ONE-TIME SETUP (about 3 minutes):
   1. Create a Google Sheet named "Davie Curriculum Edits". Extensions → Apps Script. Delete the sample code, paste this file, Save.
   2. Project Settings (gear) → Script Properties → Add property: EDIT_PASSCODE = (a passcode for teachers). Save.
   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, approve the Google prompt.
   4. Copy the Web app URL (ends in /exec) and put it in js/data.js → DA_CONFIG.EDIT_API_URL (or send it to the bot).
   The passcode lives only here in Script Properties; the public website never contains it. */
const SHEET = "edits";
function sheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(["key", "value", "updated"]); }
  return sh;
}
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function doGet(e){
  const rows = sheet_().getDataRange().getValues().slice(1), edits = {};
  rows.forEach(r => { if (r[0] && r[1] !== "") edits[r[0]] = String(r[1]); });
  return json_({ok: true, edits});
}
function doPost(e){
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ok: false, error: "bad-json"}); }
  const pass = PropertiesService.getScriptProperties().getProperty("EDIT_PASSCODE");
  if (!pass || String(body.pass || "") !== pass) return json_({ok: false, error: "bad-pass"});
  const items = (body.items || []).filter(i => i && typeof i.key === "string" && i.key.length < 300).slice(0, 200);
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const sh = sheet_(), data = sh.getDataRange().getValues(), idx = {};
    data.forEach((r, i) => { if (i) idx[r[0]] = i + 1; });
    const toDelete = [];
    items.forEach(it => {
      const v = String(it.value || "").slice(0, 5000), row = idx[it.key];
      if (!v) { if (row) toDelete.push(row); return; }
      if (row) sh.getRange(row, 2, 1, 2).setValues([[v, new Date()]]);
      else { sh.appendRow([it.key, v, new Date()]); idx[it.key] = sh.getLastRow(); }
    });
    toDelete.sort((a, b) => b - a).forEach(r => sh.deleteRow(r));
  } finally { lock.releaseLock(); }
  return json_({ok: true});
}
