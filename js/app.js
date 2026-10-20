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
   <section class="hero fun play-hero"><div class="parallax"><img class="ch heroL bob" src="${DA.CH.owl}" alt="Davie owl"></div><div class="herotxt"><h2>Hi teachers! 👋</h2><p>Choose an age group.</p><p class="small">${U.esc(when)}</p></div><div class="parallax"><img class="ch heroR bob" src="${DA.CH.sampson}" alt="Sampson the Manatee"></div></section>
   <h2 class="sec hh">${U.ch("literacy","hd")}Curriculum by age</h2>
   <div class="grid ages">${D.ages().map(ageTile).join("")}</div>
   <a class="hometour" href="#/tour"><b>Tour day</b><span>See a sample week, our characters, and the family song.</span></a>
   <a class="homeready" href="#/grows">How your child grows with us</a>
   <a class="homeready" href="#/readiness">Kindergarten readiness</a>
   <section class="hero"><input id="q" class="search" type="search" placeholder="Search themes, books, activities, words…"></section>
   <div id="results"></div></main>`;
}
function ageTile(a){
  const cw = D.currentWeekNumber();
  const jump = cw >= 1 && cw <= 52 ? `<a class="agejump" href="#/age/${a.id}/${cw}">Jump to this week</a>` : "";
  return `<article class="age" style="--c:${a.color}"><a class="agemain" href="#/age/${a.id}">${U.ch(DA.AGE_CH[a.id],"agech bob")}<b>${U.esc(a.name)}</b><small>${U.esc(a.sub)}</small></a>${jump}</article>`;
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
    const heart = window.DA_HEART && DA_HEART[g.month];
    const heartHtml = heart && heart.en ? `<p class="heartline"><b>Davie Heart</b> ${U.esc(heart.en)}</p>` : "";
    return `<section class="monthblock"><h2 class="monthhead">${U.esc(D.monthHeader(g.month))}</h2>${heartHtml}<div class="weeklist">${rows}</div></section>`;
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
  return `<section class="card field"><h3 class="hh">${U.ch("sampson","hd")}${DA.t("character")}</h3><figure class="char"><img src="${U.esc(c.image)}" alt="${U.esc(c.name)}" loading="lazy"><figcaption>${U.esc(c.name)}</figcaption></figure></section>`;
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
function familyWords(model){
  if (!model.words || !model.words.length) return "";
  const esOn = DA.lang.family();
  return `<ul class="words">${model.words.map(w => {
    const en = Array.isArray(w) ? w[0] : w;
    const es = Array.isArray(w) ? w[1] : "";
    if (esOn && es) return `<li><b>${U.esc(es)}</b><span>${U.esc(en)}</span></li>`;
    return `<li><b>${U.esc(en)}</b>${es ? `<span>${U.esc(es)}</span>` : ""}</li>`;
  }).join("")}</ul>`;
}
function familyModel(model){
  if (!model || !DA.lang.family()) return model;
  const id = model.plan && model.plan.id;
  const es = id && window.DA_ES && DA_ES[id];
  if (!es) return model;
  return Object.assign({}, model, {
    theme: es.theme || model.theme,
    overview: es.overview || model.overview,
    home: es.home && es.home.length ? es.home : model.home,
    ask: es.ask && es.ask.length ? es.ask : model.ask,
    song: es.song || model.song
  });
}
function ollieName(){ return window.DA_OLLIE_NAME || "Ollie the Owl"; }
function videoSoon(label, who){
  return `<div class="video-ph">${U.ch(who || "sampson","sm")}<small>${U.esc(label)}</small></div>`;
}
function spanishWordCard(model){
  const w = model.spanishWord;
  if (!w || !w.word) return "";
  return `<section class="card" id="spanish-word"><h3>${DA.t("spanishWord")}</h3><p class="signword">${U.esc(w.word)}</p><p>${DA.t("means")} ${U.esc(w.en || "")}</p><p class="say">${DA.t("soundsLike")} ${U.esc(w.say || "")}</p></section>`;
}
function signCard(model){
  const s = model.sign;
  if (!s) return "";
  const clip = s.video ? U.video(s.video) : videoSoon(DA.t("sampsonSoon"), "sampson");
  return `<section class="card" id="sign-week"><h3 class="hh">${U.ch("sampson","hd")}${DA.t("sign")}</h3><p class="signword">${U.esc(DA.pick(s.word))}</p><h4>${DA.t("signHow")}</h4><p>${U.esc(DA.pick(s.how))}</p>${clip}</section>`;
}
function songEsCard(model){
  const clip = model.songEsVideo ? U.video(model.songEsVideo) : videoSoon(DA.t("songEsSoon"), "music");
  return `<section class="card" id="song-es"><h3 class="hh">${U.ch("music","hd")}${DA.t("songEs")}</h3>${clip}</section>`;
}
function challengeCard(model){
  const text = DA.pick(model.challenge);
  if (!text) return "";
  return `<section class="card callout" id="home-challenge"><h3>${DA.t("challenge")}</h3><p>${U.esc(text)}</p></section>`;
}
function feelingsCard(model){
  const text = DA.pick(model.feelings);
  if (!text) return "";
  return `<section class="card ollie" id="ollie"><h3 class="hh"><img class="ch hd" src="${DA.CH.owl}" alt="${U.esc(ollieName())}">${DA.t("feelings")} ${U.esc(ollieName())}</h3><p>${U.esc(text)}</p></section>`;
}
function heartCard(model){
  const text = DA.pick(model.heart);
  if (!text) return "";
  return `<section class="card heartcard" id="davie-heart"><h3>${DA.t("heart")}</h3><p class="kicker">${DA.t("heartLead")}</p><p>${U.esc(text)}</p></section>`;
}
function familyBlock(model){
  const words = familyWords(model);
  const home = familyHome(model);
  const ask = familyAsk(model);
  const homeLabel = home.length === 3 ? DA.t("home3") : DA.t("home");
  const homeHtml = home.length ? `<h3>${homeLabel}</h3><ol class="big">${home.map(h => Array.isArray(h) ? `<li><b>${U.esc(h[0])}</b> ${U.esc(h[1] || "")}</li>` : `<li>${U.esc(h)}</li>`).join("")}</ol>` : "";
  const askHtml = ask.length ? `<h3>${DA.t("ask")}</h3><ul class="big">${ask.map(x => `<li>${U.esc(x)}</li>`).join("")}</ul>` : "";
  const lyric = model.song ? `<p class="lyrics">${U.esc(model.song)}</p>` : "";
  const video = model.songVideo ? U.video(model.songVideo, model.songPoster) : `<div class="video-ph">${U.ch("music","sm")}<small>${DA.t("songSoon")}</small></div>`;
  return `<section class="card family" id="family">
    ${words ? `<h3>${DA.t("word")}</h3>${words}` : ""}
    ${spanishWordCard(model)}
    ${askHtml}${homeHtml}
    ${challengeCard(model)}
    ${signCard(model)}
    <h3 class="hh">${U.ch("music","hd")}${DA.t("song")}</h3>
    <div class="songslot">${video}${lyric}</div>
    ${songEsCard(model)}
    ${feelingsCard(model)}
    ${heartCard(model)}
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
    ${challengeCard(model)}
    ${feelingsCard(model)}
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
function langToggle(){
  const on = DA.lang.get();
  return `<div class="langtoggle" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="${on === "en"}" class="${on === "en" ? "on" : ""}">English</button><button type="button" data-lang="es" aria-pressed="${on === "es"}" class="${on === "es" ? "on" : ""}">Español</button></div>`;
}
function parentHeader(){
  return `<header class="top parent">${U.brand(DA.t("familyBrand"))}${langToggle()}</header>`;
}
function siteHomeUrl(){
  return String(DA_CONFIG.PARENT_BASE_URL || "").replace(/parent\.html$/, "") || location.href;
}
function digestText(model){
  const home = familyHome(model).map(h => Array.isArray(h) ? `${h[0]}: ${h[1]}` : h).join("\n");
  const ask = familyAsk(model).join(", ");
  const url = D.parentUrlForWeek(model.age.id, model.weekN);
  return [
    `${DA.t("thisWeekHome")} — ${DA_CONFIG.schoolName}`,
    `${DA.ageLabel(model.age)} · ${DA.t("week")} ${model.weekN}: ${model.theme}`,
    model.overview || "",
    ask ? `${DA.t("ask")} ${ask}` : "",
    home,
    DA.pick(model.challenge) ? `${DA.t("challenge")}: ${DA.pick(model.challenge)}` : "",
    url
  ].filter(Boolean).join("\n\n");
}
let pendingShare = null;
function shareBar(model){
  const url = D.parentUrlForWeek(model.age.id, model.weekN);
  const text = digestText(model);
  pendingShare = { title: `${DA.t("thisWeekHome")}: ${model.theme}`, text, url };
  const sms = "sms:?&body=" + encodeURIComponent(text);
  const mail = "mailto:?subject=" + encodeURIComponent(pendingShare.title) + "&body=" + encodeURIComponent(text);
  return `<section class="card sharecard"><h3>${DA.t("send")}</h3><div class="sharebar">
    <button type="button" class="btn" id="share-native">${DA.t("share")}</button>
    <button type="button" class="btn ghost" id="share-copy">${DA.t("copyLink")}</button>
    <a class="btn ghost" id="share-sms" href="${sms}">${DA.t("textMsg")}</a>
    <a class="btn ghost" id="share-mail" href="${mail}">${DA.t("email")}</a>
  </div><p class="share-status" id="share-status" aria-live="polite"></p></section>`;
}
function parentSoon(model){
  const a = model.age;
  return `${parentHeader()}<main class="wrap narrow"><section class="card sooncard">
    ${U.ch(DA.AGE_CH[a.id], "soonch")}
    <h2>${DA.t("week")} ${model.weekN}</h2>
    <p class="soonmsg">${DA.t("comingSoon")}</p>
    <p>${DA.t("soonBody")}</p>
  </section>${heartCard(model)}</main>`;
}
function parentPage(model){
  if (!model) return home();
  model = familyModel(model);
  if (!model.ready) return parentSoon(model);
  const chips = [];
  if (model.letter) chips.push(`<div class="chip"><small>${DA.t("letter")}</small><b>${U.esc(model.letter)}</b></div>`);
  if (model.number) chips.push(`<div class="chip"><small>${DA.t("number")}</small><b>${U.esc(model.number)}</b></div>`);
  if (model.shape) chips.push(`<div class="chip"><small>${DA.t("shape")}</small><b>${U.esc(model.shape)}</b></div>`);
  if (model.color) chips.push(`<div class="chip"><small>${DA.t("color")}</small><b>${U.esc(model.color)}</b></div>`);
  return `${parentHeader()}<main class="wrap narrow parentpg" id="family-digest" style="--c:${model.age.color}">
    <section class="card hero2 fun"><img class="ch pch" src="${DA.CH.sampson}" alt=""><small>${U.esc(DA.ageLabel(model.age))} · ${DA.t("week")} ${model.weekN}${model.range ? " · " + U.esc(model.range.label) : ""}</small>
      <h2>${DA.t("thisWeekHome")}</h2>
      <p class="learnline">${DA.t("learningAbout")} ${U.esc(model.theme)}</p>
      ${model.overview ? `<p>${U.esc(model.overview)}</p>` : ""}
      ${chips.length ? `<div class="ofweek">${chips.join("")}</div>` : ""}</section>
    ${shareBar(model)}
    ${characterField(model)}
    ${familyBlock(model)}
    <p class="note">${DA.t("fromTeacher")} ${U.esc(DA_CONFIG.schoolName)}.</p>
    <p class="family-more"><a href="#/readiness">${DA.t("readiness")}</a></p>
  </main>`;
}
function standardsDomain(tag){
  const s = String(tag || "").trim().toLowerCase().replace(/&/g, "and");
  if (!s || s === "tbd") return "";
  return (window.DA_DOMAINS || []).find(d => s.includes(d.toLowerCase())) || "";
}
function readinessPage(){
  const cw = D.currentWeekNumber();
  const by = {};
  (DA_DOMAINS || []).forEach(d => { by[d] = []; });
  for (let n = 1; n <= 52; n++) {
    const model = D.weekModel("vpk", n);
    if (!model || !model.ready) continue;
    const seen = new Set();
    (model.activities || []).forEach(a => {
      const domain = standardsDomain(a.standards);
      if (!domain || seen.has(domain)) return;
      seen.add(domain);
      by[domain].push({ n, theme: (familyModel(Object.assign({}, model, { plan: model.plan }))).theme, inYear: cw >= 1 && cw <= 52 && n <= cw });
    });
  }
  const covered = (DA_DOMAINS || []).filter(d => by[d].some(w => w.inYear)).length;
  const total = (DA_DOMAINS || []).length;
  const items = (DA_DOMAINS || []).map(d => {
    const weeks = by[d];
    const on = weeks.some(w => w.inYear);
    const links = weeks.map(w => `<a href="#/parent/vpk/w/${w.n}">${DA.t("week")} ${w.n} · ${U.esc(w.theme)}</a>`).join("");
    return `<li class="ready-item${on ? " is-on" : ""}"><span class="ready-mark" aria-hidden="true">${on ? "✓" : ""}</span><div><h3>${U.esc(DA.domainLabel(d))}</h3><p>${U.esc(DA.domainBlurb(d))}</p>${links ? `<p class="ready-weeks">${DA.t("coveredIn")} ${links}</p>` : `<p class="ready-weeks">${DA.t("notYet")}</p>`}</div></li>`;
  }).join("");
  return `${parentHeader()}<main class="wrap narrow readiness">
    <p class="crumb"><a href="#/">Home</a> · <a href="#/parent/vpk/w/${cw >= 1 && cw <= 52 ? cw : 11}">VPK</a></p>
    <h2>${DA.t("readiness")}</h2>
    <p>${DA.t("readinessLead")}</p>
    <p class="ready-score"><b>${covered}</b> / ${total} ${DA.t("soFar")}</p>
    <ol class="ready-list">${items}</ol>
  </main>`;
}
function tourPage(){
  const sample = familyModel(D.weekModel("vpk", 11));
  const points = DA.tourPoints().map(([h, p]) => `<li><b>${U.esc(h)}</b><span>${U.esc(p)}</span></li>`).join("");
  const chars = castFigures();
  const ages = D.ages().map(a => `<a class="btn ghost" href="#/parent/${a.id}/w/11">${U.esc(DA.ageLabel(a))}</a>`).join("");
  const home = sample ? familyHome(sample).slice(0, 3) : [];
  const homeHtml = home.map(h => Array.isArray(h) ? `<li><b>${U.esc(h[0])}</b> ${U.esc(h[1] || "")}</li>` : `<li>${U.esc(h)}</li>`).join("");
  const url = siteHomeUrl();
  return `${parentHeader()}<main class="wrap narrow tourpage">
    <section class="card hero2 fun tour-hero play-hero"><div class="wave-sampson parallax"><span class="bubble">${DA.t("wave")}</span><img class="ch pch bob" src="${DA.CH.sampson}" alt="Sampson the Manatee"></div><p class="kicker">${DA.t("tourKicker")}</p><h2>${DA.t("tourTitle")}</h2><p>${DA.t("tourLead")}</p></section>
    <h2 class="sec">${DA.t("meet")}</h2>
    <div class="tour-chars">${chars}</div>
    <p><a class="btn ghost" href="#/grows">${DA.t("grows")}</a></p>
    <section class="card" id="sample-week"><p class="kicker">${DA.t("sampleWeek")} · ${DA.t("week")} 11</p><h2>${sample ? U.esc(sample.theme) : "Pumpkin Patch"}</h2>
      ${sample && sample.banner ? `<img class="weekbanner" src="${U.esc(sample.banner)}" alt="">` : ""}
      ${sample && sample.overview ? `<p>${U.esc(sample.overview)}</p>` : ""}
      ${homeHtml ? `<h3>${DA.t("home3")}</h3><ol class="big">${homeHtml}</ol>` : ""}
      ${sample && sample.songVideo ? `<h3 class="hh">${U.ch("music","hd")}${DA.t("song")}</h3>${U.video(sample.songVideo, sample.songPoster)}` : ""}
      <p class="ages-this">${DA.t("agesThisWeek")}</p>
      <div class="sharebar">${ages}</div>
      <a class="btn" href="#/parent/vpk/w/11">${DA.t("openFamily")}</a>
    </section>
    <section class="card"><h2>${DA.t("special")}</h2><ul class="tour-points">${points}</ul></section>
    <section class="card tour-qr"><h2>${DA.t("scan")}</h2>${U.qr(url, 6)}<p>${U.esc(url)}</p></section>
    <section class="card tour-cta" id="schedule"><h2>${DA.t("schedule")}</h2><p>${DA.t("scheduleBody")}</p><a class="btn" href="#/tour">${DA.t("schedule")}</a></section>
  </main>`;
}
function castFigures(){
  const list = window.DA_CAST || [];
  return list.map(c => {
    const name = c.img === "owl" || !c.name ? (c.img === "owl" ? ollieName() : c.name) : c.name;
    const src = DA.CH[c.img] || "";
    return `<figure class="tour-char"><img class="bob" src="${src}" alt="${U.esc(name)}" loading="lazy" decoding="async"><figcaption>${U.esc(name)}<small>${U.esc(DA.pick(c.role))}</small></figcaption></figure>`;
  }).join("");
}
function growsPage(){
  const steps = (window.DA_GROWTH || []).map((step, i) => {
    const age = D.age(step.ageId);
    if (!age) return "";
    const focus = String(DA.pick(step.focus) || "").replaceAll("{owl}", ollieName());
    const program = String(DA.pick(step.program) || "").replaceAll("{owl}", ollieName());
    return `<li class="grow-step"><span class="grow-n">${i + 1}</span><div>${U.ch(DA.AGE_CH[age.id], "hd")}<h3>${U.esc(DA.ageLabel(age))}</h3><p class="small">${U.esc(age.sub)}</p><p><b>${DA.t("roomFocus")}</b> ${U.esc(focus)}</p><p>${U.esc(program)}</p></div></li>`;
  }).join("");
  return `${parentHeader()}<main class="wrap narrow growpage">
    <p class="crumb"><a href="#/">Home</a> · <a href="#/tour">${DA.t("tourKicker")}</a></p>
    <h2>${DA.t("grows")}</h2>
    <p>${DA.t("growsLead")}</p>
    <ol class="grow-list">${steps}</ol>
    <h2 class="sec">${DA.t("programs")}</h2>
    <div class="tour-chars">${castFigures()}</div>
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
function wireShare(payload){
  const status = $("#share-status");
  const copyBtn = $("#share-copy");
  const nativeBtn = $("#share-native");
  function mark(msg){ if (status) status.textContent = msg; }
  async function copyText(value){
    let ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        ok = true;
      }
    } catch (e) {}
    if (!ok) {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove();
    }
    if (ok) {
      mark(DA.t("copied"));
      if (copyBtn) copyBtn.textContent = DA.t("copied");
    } else window.prompt(DA.t("copyLink"), value);
  }
  if (copyBtn) copyBtn.onclick = () => copyText(payload.url);
  if (nativeBtn) nativeBtn.onclick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: payload.title, text: payload.text, url: payload.url });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    copyText(payload.url);
  };
}
function render(){
  const p = location.hash.replace(/^#\/?/, "").split("/");
  let screen = "", sheet = "";
  pendingShare = null;
  document.querySelectorAll(".pop-host").forEach(n => n.remove());
  DA.lang.surface = (p[0] === "parent" || p[0] === "pplan" || p[0] === "tour" || p[0] === "readiness" || p[0] === "grows") ? "family" : "teacher";
  document.documentElement.lang = DA.lang.family() ? "es" : "en";
  try {
    if (p[0] === "tour") screen = tourPage();
    else if (p[0] === "grows") screen = growsPage();
    else if (p[0] === "readiness") screen = readinessPage();
    else if (p[0] === "age" && p[2]) {
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
  document.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => { DA.lang.set(b.dataset.lang); render(); });
  if (pendingShare) wireShare(pendingShare);
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
      if (cb.checked) celebrate(cb);
    });
  }
  bindMotion();
}
let motionIO = null;
let motionScroll = null;
function motionOff(){
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function markReveal(list, calm){
  list.forEach((el, i) => {
    el.classList.add("reveal");
    if (calm) el.classList.add("reveal-calm");
    el.style.setProperty("--i", String(i % 6));
  });
}
function settleReveal(el){
  const done = ev => {
    if (ev && ev.target !== el) return;
    el.classList.add("settled");
  };
  el.addEventListener("transitionend", done);
  setTimeout(() => el.classList.add("settled"), 900);
}
function bindMotion(){
  if (motionIO) { motionIO.disconnect(); motionIO = null; }
  if (motionScroll) { removeEventListener("scroll", motionScroll); motionScroll = null; }
  const reduce = motionOff();
  const calm = document.querySelector(".weekpage");
  if (calm) markReveal(calm.querySelectorAll(".card"), true);
  else {
    document.querySelectorAll(".monthblock").forEach(block => markReveal(block.querySelectorAll(".weekrow"), false));
    markReveal(document.querySelectorAll(".home-lead .age, .home-lead .hometour, .home-lead .homeready"), false);
    markReveal(document.querySelectorAll(".tourpage .card:not(.tour-hero), .tourpage .tour-char, .growpage .grow-step, .growpage .tour-char"), false);
    markReveal(document.querySelectorAll(".readiness .ready-item, .parentpg .card"), true);
  }
  const nodes = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) nodes.forEach(n => n.classList.add("in", "settled"));
  else {
    motionIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        settleReveal(e.target);
        motionIO.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px 8% 0px", threshold: 0.08 });
    nodes.forEach(n => motionIO.observe(n));
  }
  if (reduce) return;
  const bounce = el => {
    el.classList.remove("tapped");
    requestAnimationFrame(() => el.classList.add("tapped"));
  };
  document.querySelectorAll(".bob").forEach(el => {
    if (el.closest(".wave-sampson")) return;
    el.onpointerdown = () => bounce(el);
    el.onanimationend = ev => { if (ev.animationName === "tap-bounce") el.classList.remove("tapped"); };
  });
  document.querySelectorAll(".wave-sampson").forEach(wrap => {
    const img = wrap.querySelector(".bob");
    if (!img) return;
    wrap.onpointerdown = () => bounce(img);
    img.onanimationend = ev => { if (ev.animationName === "tap-bounce") img.classList.remove("tapped"); };
  });
  const heroes = document.querySelectorAll(".play-hero");
  if (!heroes.length) return;
  let tick = false;
  motionScroll = () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      tick = false;
      const view = window.innerHeight || 800;
      heroes.forEach(hero => {
        const r = hero.getBoundingClientRect();
        if (r.bottom < 0 || r.top > view) return;
        const mid = r.top + r.height / 2 - view * 0.32;
        const shift = Math.max(-12, Math.min(12, mid * 0.04));
        hero.querySelectorAll(".parallax").forEach((el, i) => {
          const dir = i === 0 ? 1 : -0.7;
          el.style.transform = "translate3d(0," + (shift * dir).toFixed(1) + "px,0)";
        });
      });
    });
  };
  addEventListener("scroll", motionScroll, { passive: true });
  motionScroll();
}
function celebrate(anchor){
  if (motionOff()) return;
  const old = document.querySelector(".pop-host");
  if (old) old.remove();
  const host = document.createElement("div");
  host.className = "pop-host";
  host.setAttribute("aria-hidden", "true");
  const rect = anchor.getBoundingClientRect();
  host.style.left = (rect.left + rect.width / 2) + "px";
  host.style.top = (rect.top + rect.height / 2) + "px";
  const colors = ["#022A4F", "#F7931E", "#022A4F", "#F7931E", "#A85B00"];
  for (let i = 0; i < 12; i++) {
    const bit = document.createElement("i");
    bit.className = "confetti";
    const angle = (Math.PI * 2 * i) / 12 - Math.PI / 2;
    const dist = 34 + (i % 4) * 12;
    bit.style.setProperty("--dx", (Math.cos(angle) * dist).toFixed(1) + "px");
    bit.style.setProperty("--dy", (Math.sin(angle) * dist).toFixed(1) + "px");
    bit.style.setProperty("--spin", ((i % 2 ? 1 : -1) * (50 + i * 18)) + "deg");
    bit.style.background = colors[i % colors.length];
    host.appendChild(bit);
  }
  const face = document.createElement("img");
  face.className = "pop-ch";
  face.src = DA.CH.sampson;
  face.alt = "";
  host.appendChild(face);
  document.body.appendChild(host);
  setTimeout(() => host.remove(), 760);
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
