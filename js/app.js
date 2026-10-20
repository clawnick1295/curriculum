/* Router. Age groups open a 52-week school year. Each week uses one template. */
(function(){
const D = DA.data, U = DA.ui, $ = s => document.querySelector(s);
const SLOT_LABEL = {circle:"Circle", centers:"Centers", art:"Art", movement:"Movement", outdoor:"Outdoor", book:"Book"};
const SLOT_ORDER = ["circle","centers","art","movement","outdoor"];
const SLOT_CH = {circle:"circle", centers:"sensory", art:"art", movement:"movement", outdoor:"movement", book:"story"};
const DAY_ORDER = ["Mon","Tue","Wed","Thu","Fri"];
const DAY_NAME = {Mon:"Monday", Tue:"Tuesday", Wed:"Wednesday", Thu:"Thursday", Fri:"Friday"};
const nav = (role) => `<header class="top">${U.brand(role)}<nav>
  <a href="#/">🏠 Home</a><a href="#/director">Director</a></nav></header>`;

function home(){
  const cw = D.currentWeekNumber();
  const inYear = cw >= 1 && cw <= 52;
  const when = inYear ? `Week ${cw} · ${D.weekRange(cw).label}` : `School year starts ${DA_CONFIG.SCHOOL_YEAR_START}`;
  return nav("Curriculum Dashboard") + `<main class="wrap home-lead">
   <section class="hero fun"><img class="ch heroL" src="${DA.CH.owl}" alt="Davie owl"><div class="herotxt"><h2>Hi teachers! 👋</h2><p>Choose an age group.</p><p class="small">${U.esc(when)}</p></div><img class="ch heroR" src="${DA.CH.sampson}" alt="Sampson the Manatee"></section>
   <h2 class="sec hh">${U.ch("literacy","hd")}Curriculum by age</h2>
   <div class="grid ages">${D.ages().map(ageTile).join("")}</div>
   <section class="hero"><input id="q" class="search" type="search" placeholder="Search themes, books, activities, words…"></section>
   <div id="results"></div></main>`;
}
function ageTile(a){
  const cw = D.currentWeekNumber();
  const jump = cw >= 1 && cw <= 52 ? `<a class="agejump" href="#/age/${a.id}/${cw}">Jump to this week</a>` : "";
  return `<article class="age" style="--c:${a.color}"><a class="agemain" href="#/age/${a.id}">${U.ch(DA.AGE_CH[a.id],"agech")}<b>${U.esc(a.name)}</b><small>${U.esc(a.sub)}</small></a>${jump}</article>`;
}
function search(q){
  q = q.trim().toLowerCase(); const out = []; if (q.length < 2) return "";
  (window.DA_PLANS || []).filter(p => !p.hidden).forEach(p => {
    const hit = D.yearWeekForPlan(p.id); if (!hit) return;
    const hay = [p.theme, p.short, p.letter, p.age, p.room, p.circle].join(" ").toLowerCase();
    if (hay.includes(q)) out.push(`<a class="result" href="#/age/${hit.ageId}/${hit.n}">${U.esc(p.short || p.theme.split(" – ")[0])} <small>${U.esc(p.age)} · Week ${hit.n}</small></a>`);
  });
  D.ages().forEach(a => D.months().forEach(m => m.weeks.forEach(w => {
    const v = D.weekFor(a.id, m.id, w.n); const hay = JSON.stringify([w.theme, w.overview, w.words, v && v.acts]).toLowerCase();
    if (hay.includes(q)) {
      const yn = D.yearWeekForSample(a.id, m.id, w.n);
      const href = yn ? `#/age/${a.id}/${yn}` : `#/week/${a.id}/${m.id}/${w.n}`;
      out.push(`<a class="result" href="${href}">${w.icon} ${U.esc(w.theme)} <small>${U.esc(a.name)} · Week ${yn || w.n}</small></a>`);
    }
  })));
  return `<div class="card"><h3>${out.length} result(s)</h3>${out.join("") || "<p>No matches.</p>"}</div>`;
}

function agePage(ageId){
  const a = D.age(ageId); if (!a) return home();
  const cw = D.currentWeekNumber();
  const inYear = cw >= 1 && cw <= 52;
  const groups = D.monthGroups().map(g => {
    const rows = g.weeks.map(n => {
      const s = D.weekModel(ageId, n);
      const current = n === cw;
      const soon = !s.ready;
      const label = soon ? (s.theme || "Coming soon") : s.theme;
      const extra = soon && s.theme ? `<span class="wsoon">Coming soon</span>` : "";
      const letter = !soon && s.letter ? `<span class="wl">${U.esc(s.letter)}</span>` : `<span class="wl"></span>`;
      const meta = `${s.range ? U.esc(s.range.label) : ""}${current ? ` <span class="wthis">This week</span>` : ""}`;
      return `<a class="weekrow${soon ? " soon" : ""}${current ? " is-current" : ""}" ${current ? 'id="week-current"' : ""} data-week="${n}" href="#/age/${ageId}/${n}"><span class="wn">Week ${n}</span><span class="wt">${U.esc(label)}</span><span class="wmeta">${meta}${extra}</span>${letter}<span class="wgo" aria-hidden="true">›</span></a>`;
    }).join("");
    return `<section class="monthblock"><h2 class="monthhead">${U.esc(D.monthHeader(g.month))}</h2><div class="weeklist">${rows}</div></section>`;
  }).join("");
  const jump = inYear ? `<button type="button" class="btn ghost" id="jump-current">Jump to this week</button>` : "";
  const note = inYear ? `Week ${cw} · ${D.weekRange(cw).label}` : (cw < 1 ? `School year starts ${DA_CONFIG.SCHOOL_YEAR_START}.` : `This date is past week 52.`);
  return nav(a.name) + `<main class="wrap agepage" style="--c:${a.color}">
    <p class="crumb"><a href="#/">Home</a> › ${U.esc(a.name)}</p>
    <section class="agehead">${U.ch(DA.AGE_CH[ageId], "ageheadch")}<div><h2>${U.esc(a.name)}</h2><p>${U.esc(a.sub)}</p><p class="small">${U.esc(note)}</p>${jump}</div></section>
    ${groups}</main>`;
}

function stdTag(code){
  const c = String(code || "").trim();
  const show = !c || /^tbd$/i.test(c) ? "TBD" : c;
  return `<span class="stdtag">Standards: ${U.esc(show)}</span>`;
}
function actKey(act){ return [act.slot, act.day || "week", act.title].join("|"); }
function obsBox(model, act){
  const id = actKey(act);
  const on = DA.store.obsGet(model.age.id, model.weekN, id);
  return `<label class="observed"><input type="checkbox" data-obs="${encodeURIComponent(id)}" ${on ? "checked" : ""}> Observed</label>`;
}
function activityCard(model, act){
  const mats = act.materials && act.materials.length ? `<h4>Materials</h4>${U.supplies(act.materials)}` : "";
  const pic = act.image ? U.photo(act.image, act.title, act.imageNote) : "";
  const vid = act.video ? U.video(act.video) : "";
  const steps = act.steps ? `<p>${U.esc(act.steps)}</p>` : "";
  return `<article class="card act act-${act.slot}">
    <header class="hh">${U.ch(SLOT_CH[act.slot] || "circle", "hd")}<div><span class="tag">${SLOT_LABEL[act.slot] || ""}</span><h3>${U.esc(act.title)}</h3></div></header>
    ${pic}${steps}${mats}${vid}
    <div class="actfoot">${stdTag(act.standards)}${obsBox(model, act)}</div>
  </article>`;
}
function wordList(words){
  if (!words || !words.length) return "";
  return `<ul class="words">${words.map(w => {
    const en = Array.isArray(w) ? w[0] : w;
    const es = Array.isArray(w) ? w[1] : "";
    return `<li><b>${U.esc(en)}</b>${es ? `<span>${U.esc(es)}</span>` : ""}</li>`;
  }).join("")}</ul>`;
}
function numberShapeField(model){
  const bits = [];
  if (model.number) bits.push(`<div class="chip"><small>Number</small><b>${U.esc(model.number)}</b></div>`);
  if (model.shape) bits.push(`<div class="chip"><small>Shape</small><b>${U.esc(model.shape)}</b></div>`);
  if (model.color) bits.push(`<div class="chip"><small>Color</small><b>${U.esc(model.color)}</b></div>`);
  if (!bits.length) return "";
  const heading = model.number || model.shape ? "Number/Shape" : "Color";
  return `<section class="card field"><h3>${heading}</h3><div class="ofweek">${bits.join("")}</div></section>`;
}
function songField(model){
  if (!model.song && !model.songVideo) return "";
  const vid = model.songVideo ? U.video(model.songVideo, model.songPoster) : "";
  const lyric = model.song ? `<p class="lyrics">${U.esc(model.song)}</p>` : "";
  return `<section class="card field"><h3 class="hh">${U.ch("music","hd")}Song</h3>${vid}${lyric}</section>`;
}
function bookField(model){
  const b = model.book; if (!b) return "";
  const mats = b.materials && b.materials.length ? `<h4>Materials</h4>${U.supplies(b.materials)}` : "";
  const vid = b.video ? U.video(b.video) : "";
  return `<section class="card field"><h3 class="hh">${U.ch("story","hd")}Book</h3><h4>${U.esc(b.title)}</h4>${b.detail ? `<p>${U.esc(b.detail)}</p>` : ""}${mats}${vid}<div class="actfoot">${stdTag(b.standards)}${obsBox(model, {slot:"book", day:"", title:b.title, standards:b.standards || ""})}</div></section>`;
}
function characterField(model){
  const c = model.character; if (!c) return "";
  return `<section class="card field"><h3 class="hh">${U.ch("sampson","hd")}Character</h3><figure class="char"><img src="${U.esc(c.image)}" alt="${U.esc(c.name)}" loading="lazy"><figcaption>${U.esc(c.name)}</figcaption></figure></section>`;
}
function weekActivities(model){
  const slots = SLOT_ORDER.map(slot => {
    const items = model.activities.filter(a => !a.day && a.slot === slot);
    if (!items.length) return "";
    return `<section class="slotblock"><h3 class="sec hh">${U.ch(SLOT_CH[slot], "hd")}${SLOT_LABEL[slot]}</h3><div class="acts">${items.map(a => activityCard(model, a)).join("")}</div></section>`;
  }).join("");
  const days = DAY_ORDER.map(d => {
    const items = model.activities.filter(a => a.day === d);
    if (!items.length) return "";
    return `<section class="dayblock"><h3 class="sec">${DAY_NAME[d]}</h3><div class="acts">${items.map(a => activityCard(model, a)).join("")}</div></section>`;
  }).join("");
  const dayWrap = days ? `<section class="dayswrap"><h2 class="sec">Days</h2>${days}</section>` : "";
  return slots + dayWrap;
}
function checklist(model){
  const c = DA.store.get(model.age.id, "y", model.weekN);
  return `<section class="card no-print"><h3>✅ Teacher weekly checklist</h3><div class="checks">${DA.CHECK_ITEMS.map(([k, l]) => `<label class="bigcheck"><input type="checkbox" data-k="${k}" ${c[k] ? "checked" : ""}> ${l}</label>`).join("")}</div><small>Saved on this iPad only.</small></section>`;
}
function homeTips(p){
  const t = [];
  if (/hygiene/i.test(p.theme)) t.push("Have your child teach you how they wash their hands or brush their teeth.");
  if (/fall/i.test(p.theme)) t.push("On a walk, point out signs of fall: leaves changing color, falling leaves, cooler weather.");
  t.push(`Find things at home that start with the letter ${p.letter[0]}.`);
  return t;
}
function familyHome(model){
  if (model.home && model.home.length) return model.home;
  if (model.plan) return homeTips(model.plan);
  return [];
}
function familyAsk(model){
  if (model.ask && model.ask.length) return model.ask;
  if (!model.plan) return [];
  const p = model.plan, items = [];
  if (p.steam) items.push(p.steam.name);
  (p.crafts || []).forEach(c => items.push(c.name));
  return items;
}
function familyBlock(model){
  const words = wordList(model.words);
  const home = familyHome(model);
  const ask = familyAsk(model);
  const homeLabel = home.length === 3 ? "3 five-minute home activities" : "Five-minute home activities";
  const homeHtml = home.length ? `<h3>${homeLabel}</h3><ol class="big">${home.map(h => Array.isArray(h) ? `<li><b>${U.esc(h[0])}</b> ${U.esc(h[1] || "")}</li>` : `<li>${U.esc(h)}</li>`).join("")}</ol>` : "";
  const askHtml = ask.length ? `<h3>Ask me about…</h3><ul class="big">${ask.map(x => `<li>${U.esc(x)}</li>`).join("")}</ul>` : "";
  const lyric = model.song ? `<p class="lyrics">${U.esc(model.song)}</p>` : "";
  const video = model.songVideo ? U.video(model.songVideo, model.songPoster) : `<div class="video-ph">${U.ch("music","sm")}<small>Theme song video coming soon</small></div>`;
  return `<section class="card family" id="family">
    ${words ? `<h3>Word of the week</h3>${words}` : ""}
    ${homeHtml}${askHtml}
    <h3 class="hh">${U.ch("music","hd")}Theme song</h3>
    <div class="songslot">${video}${lyric}</div>
  </section>`;
}
function brief(s, n){
  const t = String(s || "").replace(/\s+/g, " ").trim();
  if (!t) return "";
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
}
function sheetHTML(model){
  if (!model || !model.ready) return "";
  const meta = [];
  if (model.letter) meta.push(`<div><small>Letter</small><b>${U.esc(model.letter)}</b></div>`);
  if (model.number || model.shape) meta.push(`<div><small>Number/Shape</small><b>${U.esc([model.number, model.shape].filter(Boolean).join(" · "))}</b></div>`);
  if (model.words && model.words.length) meta.push(`<div><small>Word of the week</small><b>${U.esc(model.words.map(w => Array.isArray(w) ? w[0] : w).join(", "))}</b></div>`);
  const slots = SLOT_ORDER.map(slot => {
    const items = model.activities.filter(a => a.slot === slot && !a.day);
    if (!items.length) return "";
    return `<section class="sh-slot"><h3>${SLOT_LABEL[slot]}</h3><ul>${items.map(a => {
      const mats = (a.materials || []).slice(0, 8).join(", ");
      const code = String(a.standards || "").trim();
      const std = !code || /^tbd$/i.test(code) ? "TBD" : code;
      return `<li><b>${U.esc(a.title)}</b> ${U.esc(brief(a.steps, 120))}${mats ? ` <i>${U.esc(mats)}</i>` : ""} <span>Standards: ${U.esc(std)}</span></li>`;
    }).join("")}</ul></section>`;
  }).join("");
  const anyDay = model.activities.some(a => a.day);
  const dayItems = anyDay ? DAY_ORDER.map(d => {
    const items = model.activities.filter(a => a.day === d);
    return `<div class="sh-day"><b>${DAY_NAME[d].slice(0, 3)}</b><span>${items.length ? U.esc(items.map(a => a.title).join("; ")) : ""}</span></div>`;
  }).join("") : "";
  const extras = [];
  if (model.book) extras.push(`<b>Book</b> ${U.esc(model.book.title)}`);
  if (model.song) extras.push(`<b>Song</b> ${U.esc(brief(model.song, 90))}`);
  if (model.character) extras.push(`<b>Character</b> ${U.esc(model.character.name)}`);
  const year = model.range ? model.range.mon.getFullYear() : "";
  const when = model.range ? `${model.range.label}${year ? ", " + year : ""}` : "";
  return `<article class="weeksheet">
    <header class="sh-head"><img src="logo.svg" alt=""><div class="sh-id"><strong>${U.esc(DA_CONFIG.schoolName)}</strong>
      <div>${U.esc(model.age.name)}${model.room ? " · Room " + U.esc(model.room) : ""} · Week ${model.weekN}${when ? " · " + U.esc(when) : ""}</div>
      <h1>${U.esc(model.theme)}</h1></div>
      <div class="sh-meta">${meta.join("")}</div></header>
    ${dayItems ? `<div class="sh-days" aria-label="Days">${dayItems}</div>` : ""}
    <div class="sh-body">${slots}</div>
    ${extras.length ? `<footer class="sh-foot">${extras.join(" · ")}</footer>` : ""}
  </article>`;
}
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function step(n, title, body, ck){
  return `<section class="card step"><div class="stepn">${n}</div><div class="stepb"><h3 class="hh">${ck ? U.ch(ck, "hd") : ""}${U.esc(title)}</h3>${body}<label class="done"><input type="checkbox"> Done</label></div></section>`;
}
function todayBlock(p){
  if (!p) return "";
  const d = DAYS[new Date().getDay()];
  const dayItems = (p.days && p.days[d]) || [];
  const mon = d === "Mon" && /Mondays/.test(p.circle || "");
  let i = 1;
  const steps = [];
  if (p.circle) steps.push(step(i++, "Circle time", `<p>${U.esc(p.circle)}</p>`, "circle"));
  if (p.letterPlan) steps.push(step(i++, "Letter " + p.letter, `<p>${U.esc(p.letterPlan)}</p>`, "letter"));
  if (p.steam) steps.push(step(i++, "STEAM: " + p.steam.name, `<div class="media2">${U.photo(p.steam.img, p.steam.name)}<p>${U.esc(p.steam.desc)}</p></div>`, "steam"));
  (p.crafts || []).forEach(c => steps.push(step(i++, "Craft: " + c.name, `<div class="media2">${U.photo(c.img, c.name)}<div>${c.supplies ? "<h4>Supplies</h4>" + U.supplies(c.supplies) : ""}</div></div>`, "craft")));
  (p.activities || []).forEach(a => steps.push(step(i++, (a.group ? a.group + ": " : "Activity: ") + a.name, `<div class="media2">${U.photo(a.img, a.name, a.imgNote)}<div><p>${U.esc(a.desc || "")}</p>${a.supplies ? "<h4>Supplies</h4>" + U.supplies(a.supplies) : ""}</div></div>`, "activity")));
  return `<section class="today" id="today-view"><h2 class="sec">Today</h2>
    <section class="card todayhead"><div><small>Today is ${d} · This week's plan</small><h2>${U.esc(p.short || (p.theme || "").split(" – ")[0])}</h2>
      <div class="ofweek"><div class="chip"><small>Letter of the week</small><b>${U.esc(p.letter || "")}</b></div></div></div></section>
    ${(dayItems.length || mon) ? `<section class="card callout"><h3>Special for ${d}</h3><ul class="big">${mon ? "<li>Assign classroom jobs</li>" : ""}${dayItems.map(x => `<li>${U.esc(x)}</li>`).join("")}</ul></section>` : ""}
    ${steps.join("")}
    <p class="note">Done boxes reset when you reload.</p></section>`;
}
function comingSoon(model){
  const a = model.age;
  const label = model.theme ? U.esc(model.theme) : "Coming soon";
  return nav(a.name) + `<main class="wrap weekpage">
    <p class="crumb"><a href="#/">Home</a> › <a href="#/age/${a.id}">${U.esc(a.name)}</a> › Week ${model.weekN}</p>
    <section class="card sooncard">
      ${U.ch(DA.AGE_CH[a.id], "soonch")}
      <p class="kicker">Week ${model.weekN}${model.range ? " · " + U.esc(model.range.label) : ""}</p>
      <h2>${label}</h2>
      ${model.theme ? `<p class="soonmsg">Coming soon</p>` : ""}
      <p>Lesson plans and activities for this week aren't posted yet. Check back soon — the theme, songs, and family page will show up here.</p>
      <a class="btn" href="#/age/${a.id}">← All weeks</a>
    </section></main>`;
}
function weekScreen(model){
  if (!model) return home();
  if (!model.ready) return comingSoon(model);
  const a = model.age;
  const purl = D.parentUrlForWeek(a.id, model.weekN);
  const letter = model.letter || model.letterPlan ? `<section class="card field"><h3>Letter</h3>${model.letter ? `<div class="chip"><b>${U.esc(model.letter)}</b></div>` : ""}${model.letterPlan ? `<p>${U.esc(model.letterPlan)}</p>` : ""}</section>` : "";
  const words = wordList(model.words);
  const objectives = model.objectives && model.objectives.length ? `<section class="card field"><h3>Learning objectives</h3><ul class="big">${model.objectives.map(o => `<li>${U.esc(o)}</li>`).join("")}</ul></section>` : "";
  const domains = model.focus && model.focus.length ? `<p class="domains">${model.focus.map(f => `<span>${U.esc(f)}</span>`).join("")}</p>` : "";
  const fridge = model.sample ? `<a class="btn ghost" href="#/fridge/${a.id}/${model.sample.monthId}/${model.sample.n}">🧲 Fridge card</a>` : "";
  return nav(a.name) + `<main class="wrap weekpage" id="week-template" style="--c:${a.color}">
    <p class="crumb no-print"><a href="#/">Home</a> › <a href="#/age/${a.id}">${U.esc(a.name)}</a> › Week ${model.weekN}</p>
    ${model.banner ? `<img class="weekbanner" src="${U.esc(model.banner)}" alt="" loading="lazy">` : ""}
    <section class="card weekhead weekhero">
      <div>${U.ch(DA.AGE_CH[a.id], "ageheadch")}</div>
      <div><small>${model.room ? "Room " + U.esc(model.room) + " · " : ""}${U.esc(a.name)} · Week ${model.weekN}${model.range ? " · " + U.esc(model.range.label) : ""}</small>
        <h2>${U.esc(model.theme)}</h2>
        ${model.subtitle ? `<p>${U.esc(model.subtitle)}</p>` : ""}
        ${model.overview ? `<p>${U.esc(model.overview)}</p>` : ""}
        ${domains}</div>
      <div class="qrbox no-print">${U.qr(purl, 3)}<small>Family page</small></div>
    </section>
    <div class="toolbar no-print"><button class="btn" id="print-week" onclick="print()">Print this week</button>
      <a class="btn ghost" href="#/parent/${a.id}/w/${model.weekN}">👪 Family page</a>${fridge}
      <button class="btn ghost" id="copy">📋 Copy family message</button></div>
    ${todayBlock(model.plan)}
    ${model.plan ? "" : letter}
    ${numberShapeField(model)}
    ${words ? `<section class="card field"><h3>Word of the week</h3>${words}</section>` : ""}
    ${bookField(model)}
    ${characterField(model)}
    ${weekActivities(model)}
    ${songField(model)}
    ${objectives}
    ${checklist(model)}
  </main>`;
}
function weekMessage(model){
  const words = (model.words || []).map(w => Array.isArray(w) ? `${w[0]}${w[1] ? " (" + w[1] + ")" : ""}` : w).filter(Boolean).join(", ");
  const home = familyHome(model).map(h => Array.isArray(h) ? `${h[0]}: ${h[1]}` : h).join("\n");
  const ask = familyAsk(model).join(", ");
  return `This week at ${DA_CONFIG.schoolName} (${model.age.name}): "${model.theme}"\n\n${model.overview || ""}\n\nWord of the week: ${words || "(coming soon)"}\n\n${home}\n\nAsk me about: ${ask}\n\nFamily page: ${D.parentUrlForWeek(model.age.id, model.weekN)}`;
}
function parentSoon(model){
  const a = model.age;
  return `<header class="top parent">${U.brand("Family Page")}</header><main class="wrap narrow"><section class="card sooncard">
    ${U.ch(DA.AGE_CH[a.id], "soonch")}
    <h2>Week ${model.weekN}</h2>
    <p class="soonmsg">Coming soon</p>
    <p>This week's family page isn't ready yet. Your teacher will share the word, home activities, and song when this week is posted.</p>
  </section></main>`;
}
function parentPage(model){
  if (!model) return home();
  if (!model.ready) return parentSoon(model);
  const chips = [];
  if (model.letter) chips.push(`<div class="chip"><small>Letter</small><b>${U.esc(model.letter)}</b></div>`);
  if (model.number) chips.push(`<div class="chip"><small>Number</small><b>${U.esc(model.number)}</b></div>`);
  if (model.shape) chips.push(`<div class="chip"><small>Shape</small><b>${U.esc(model.shape)}</b></div>`);
  return `<header class="top parent">${U.brand("Family Page")}</header><main class="wrap narrow parentpg" style="--c:${model.age.color}">
    <section class="card hero2 fun"><img class="ch pch" src="${DA.CH.sampson}" alt=""><small>${U.esc(model.age.name)} · Week ${model.weekN}${model.range ? " · " + U.esc(model.range.label) : ""}</small>
      <h2>This week we're learning about ${U.esc(model.theme)}</h2>
      ${model.overview ? `<p>${U.esc(model.overview)}</p>` : ""}
      ${chips.length ? `<div class="ofweek">${chips.join("")}</div>` : ""}</section>
    ${characterField(model)}
    ${familyBlock(model)}
    <p class="note">From your child's teacher at ${U.esc(DA_CONFIG.schoolName)}.</p>
  </main>`;
}
function legacySample(ageId, monthId, n){
  const age = D.age(ageId); if (!age) return null;
  const yn = D.yearWeekForSample(ageId, monthId, n);
  if (yn) return D.weekModel(ageId, yn);
  return D.modelFromSample(age, Number(n), monthId, n, "", null);
}
function director(){
  return nav("Director Overview") + `<main class="wrap"><h2>Director overview — weekly checklists</h2><p class="note">Prototype: reads checklists saved on <i>this device</i>. Real cross-classroom tracking needs a backend.</p>
  ${D.months().map(m => `<div class="card scroll"><h3>${m.title}</h3><table class="dir"><tr><th>Age group</th>${m.weeks.map(w => `<th>Wk ${w.n}<br><small>${w.theme}</small></th>`).join("")}</tr>
  ${D.ages().map(a => `<tr><td><b style="color:${a.color}">${a.name}</b></td>${m.weeks.map(w => { const c = DA.store.get(a.id, m.id, w.n);
    return `<td>${DA.CHECK_ITEMS.map(([k, l]) => `<span class="dot ${c[k] ? "on" : ""}" title="${l}">${c[k] ? "✓" : "·"}</span>`).join("")}</td>`; }).join("")}</tr>`).join("")}</table>
   <small>Dots: activities · fridge card · parent message · Canva plan</small></div>`).join("")}</main>`;
}
function fridge(ageId, mid, n){
  const v = D.weekFor(ageId, mid, n); if (!v) return home();
  const w = v.week;
  const yn = D.yearWeekForSample(ageId, mid, n);
  const back = yn ? `#/age/${ageId}/${yn}` : `#/week/${ageId}/${mid}/${n}`;
  return `<div class="toolbar no-print wrap"><a class="btn ghost" href="${back}">← Back</a><button class="btn" onclick="print()">🖨 Print fridge card</button></div>
  <div class="fridge" style="--c:${v.age.color}"><div class="fhead"><img class="logoimg sm" src="logo.svg" alt="Davie Academy"><div><h2>${w.icon} ${w.theme}</h2><small>${DA_CONFIG.schoolName} · ${v.age.name} · Week ${yn || w.n}</small></div></div>
   <div class="fbody"><div><h4>Words of the week</h4>${U.words(w.words)}<h4>Try at home</h4><ol>${w.home.map(h => `<li><b>${h[0]}</b> – ${h[1]}</li>`).join("")}</ol>
   <h4>⭐ Challenge</h4><p>${w.challenge} Share a photo with your teacher!</p></div>
   <div class="fqr">${U.qr(D.parentUrl(ageId, mid, n), 4)}<small>Scan for songs, videos & more</small><h4>Ask me about</h4><ul>${w.ask.map(x => `<li>${x}</li>`).join("")}</ul></div></div></div>`;
}
function render(){
  const p = location.hash.replace(/^#\/?/, "").split("/");
  let screen = "", sheet = "";
  try {
    if (p[0] === "age" && p[2]) {
      const model = D.weekModel(p[1], p[2]);
      screen = weekScreen(model);
      sheet = model && model.ready ? sheetHTML(model) : "";
    } else if (p[0] === "age") screen = agePage(p[1]);
    else if (p[0] === "week") {
      const model = legacySample(p[1], p[2], p[3]);
      screen = weekScreen(model);
      sheet = model && model.ready ? sheetHTML(model) : "";
    } else if (p[0] === "parent" && p[2] === "w") screen = parentPage(D.weekModel(p[1], p[3]));
    else if (p[0] === "parent") screen = parentPage(legacySample(p[1], p[2], p[3]));
    else if (p[0] === "today" || p[0] === "plan" || p[0] === "pplan") {
      const hit = D.yearWeekForPlan(p[1]);
      if (!hit) screen = home();
      else if (p[0] === "pplan") screen = parentPage(D.weekModel(hit.ageId, hit.n));
      else { const model = D.weekModel(hit.ageId, hit.n); screen = weekScreen(model); sheet = model && model.ready ? sheetHTML(model) : ""; }
    } else if (p[0] === "fridge") screen = fridge(p[1], p[2], p[3]);
    else if (p[0] === "director") screen = director();
    else screen = home();
  } catch (e) { console.error(e); screen = home(); sheet = ""; }
  $("#app").innerHTML = `<div class="screen-only">${screen}</div>` + (sheet || "");
  document.body.classList.toggle("printing-week", !!sheet);
  scrollTo(0, 0);
  const q = $("#q"); if (q) q.oninput = () => $("#results").innerHTML = search(q.value);
  const cur = $("#week-current"); if (cur) cur.scrollIntoView({block: "center"});
  const jump = $("#jump-current"); if (jump) jump.onclick = () => { const el = $("#week-current"); if (el) el.scrollIntoView({block: "center"}); };
  const ctx = weekContext(p);
  const cp = $("#copy");
  if (cp && ctx) cp.onclick = () => {
    const t = weekMessage(D.weekModel(ctx.ageId, ctx.weekN));
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => cp.textContent = "✅ Copied!").catch(() => prompt("Copy this message:", t));
  };
  if (ctx) {
    document.querySelectorAll("[data-k]").forEach(cb => cb.onchange = () => {
      const c = DA.store.get(ctx.ageId, "y", ctx.weekN); c[cb.dataset.k] = cb.checked; DA.store.set(ctx.ageId, "y", ctx.weekN, c);
    });
    document.querySelectorAll("[data-obs]").forEach(cb => cb.onchange = () => {
      DA.store.obsSet(ctx.ageId, ctx.weekN, decodeURIComponent(cb.dataset.obs), cb.checked);
    });
  }
}
function weekContext(p){
  if (p[0] === "age" && p[2]) return {ageId: p[1], weekN: p[2]};
  if (p[0] === "week") {
    const yn = D.yearWeekForSample(p[1], p[2], p[3]);
    if (yn) return {ageId: p[1], weekN: String(yn)};
  }
  if (p[0] === "today" || p[0] === "plan") {
    const hit = D.yearWeekForPlan(p[1]);
    if (hit) return {ageId: hit.ageId, weekN: String(hit.n)};
  }
  return null;
}
addEventListener("hashchange", render); addEventListener("DOMContentLoaded", render);
})();
