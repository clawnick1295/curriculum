(function(){
const $ = s => document.querySelector(s);
const AREAS = [["social","Social"],["emotional","Emotional"],["physical","Physical"],["cognitive","Cognitive"],["language","Language"]];
const FALL_SLUG = "fall-leaves-pumpkins";
const AGES = [
  {id:"ones", name:"Ones", sub:"12–24 months", color:"#ff8a65", char:"sampson.webp"},
  {id:"twos", name:"Twos", sub:"2-year-olds", color:"#ffb300", char:"frog_movement.webp"},
  {id:"threes", name:"3 Year Olds", sub:"Room 11", color:"#66bb6a", char:"turtle_science.webp"},
  {id:"fours", name:"Fours", sub:"4-year-olds", color:"#29b6f6", char:"panther_literacy.webp"}
];
const THEMES = [
  {slug:"manatee-mornings", month:"Under the Sea in South Florida", theme:"Manatee Mornings", letter:"Mm", icon:"🐋", week:1, kind:"sea"},
  {slug:"sea-turtle-beach", month:"Under the Sea in South Florida", theme:"Sea Turtle Beach", letter:"Tt", icon:"🐢", week:2, kind:"sea"},
  {slug:"coral-reef-colors", month:"Under the Sea in South Florida", theme:"Coral Reef Colors", letter:"Ff", icon:"🐠", week:3, kind:"sea"},
  {slug:"beach-buddies", month:"Under the Sea in South Florida", theme:"Beach Buddies & Hermit Crabs", letter:"Cc", icon:"🦀", week:4, kind:"sea"},
  {slug:"fall-leaves-pumpkins", month:"Fall", theme:"Fall Leaves & Pumpkins", letter:"Ll", icon:"🍂", week:9, kind:"fall"}
];
const OLD_ROOT = /^(director|tour|grows|readiness|week|parent|today|plan|pplan|fridge)(\/|$)/;
const devHtml = s => s.dev ? `<ul class="dev">${AREAS.filter(([k]) => s.dev[k]).map(([k, l]) => `<li class="d-${k}"><b>${l}</b> <span data-ed="${s.id}|dev-${k}">${esc(s.dev[k])}</span></li>`).join("")}</ul>` : "";
const esc = s => String(s || "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fallPlans = () => window.FALL || [];

function atAlt2(){
  return /\/alt2(\/index\.html)?\/?$/.test(location.pathname);
}
function mediaUrl(src){
  if (!src) return "";
  const s = String(src);
  if (/^https?:/i.test(s) || s.indexOf("data:") === 0) return s;
  if (atAlt2()) return s.indexOf("media/") === 0 ? "../" + s : s;
  return s.indexOf("../") === 0 ? s.slice(3) : s;
}
function classicUrl(){ return atAlt2() ? "../classic/" : "classic/"; }
function isAge(id){ return AGES.some(a => a.id === id); }
function findAge(id){ return AGES.find(a => a.id === id); }
function findTheme(spec){
  if (!spec) return THEMES.find(t => t.slug === FALL_SLUG);
  return THEMES.find(t => t.slug === spec || String(t.week) === String(spec)) || null;
}
function themeHref(ageId, t){
  return "#/" + ageId + (!t || t.slug === FALL_SLUG ? "" : "/" + t.slug);
}
function themesHref(ageId){ return "#/age/" + ageId; }
function monthGroups(){
  const out = [];
  THEMES.forEach(t => {
    let m = out.find(x => x.title === t.month);
    if (!m) { m = {title: t.month, themes: []}; out.push(m); }
    m.themes.push(t);
  });
  return out;
}

function redirectClassic(){
  const raw = location.hash.replace(/^#\/?/, "");
  const p = raw.split("/").filter(Boolean);
  if (!p.length) return false;
  if (OLD_ROOT.test(raw)) {
    location.replace(classicUrl() + location.hash);
    return true;
  }
  if (p[0] === "age" && p[2]) {
    const t = isAge(p[1]) ? findTheme(p[2]) : null;
    if (t) {
      location.replace(themeHref(p[1], t));
      return true;
    }
    location.replace(classicUrl() + location.hash);
    return true;
  }
  if (p[0] === "age" && p[1] && !isAge(p[1])) {
    location.replace(classicUrl() + location.hash);
    return true;
  }
  return false;
}

function seaPlan(ageId, theme){
  const age = (window.DA_AGES || []).find(a => a.id === ageId) || findAge(ageId);
  const month = (window.DA_MONTHS || []).find(m => (m.weeks || []).some(w => w.n === theme.week));
  const week = month && (month.weeks || []).find(w => w.n === theme.week);
  if (!age || !week) return null;
  const tier = age.tier || "toddler";
  const t = (week.byTier && week.byTier[tier]) || {};
  const act = (slot, fallbackId) => {
    const a = t[slot];
    if (!a) return null;
    return {id: fallbackId, name: a.title, desc: a.steps, supplies: a.materials || [], img: a.img || ""};
  };
  const crafts = [];
  const activities = [];
  const art = act("art", "craft-0");
  if (art) crafts.push(art);
  ["story", "sensory", "movement"].forEach((slot, i) => {
    const a = act(slot, "act-" + i);
    if (a) activities.push(a);
  });
  return {
    ageId,
    age: age.name,
    theme: week.theme,
    letter: theme.letter,
    overview: week.overview || "",
    circle: t.circle ? t.circle.steps : "",
    letterPlan: theme.letter ? ("Letter of the week: " + theme.letter + ".") : "",
    steam: null,
    crafts,
    activities
  };
}

function planFor(ageId, theme){
  if (!theme) return null;
  if (theme.kind === "fall") {
    const p = fallPlans().find(x => x.ageId === ageId);
    return p || null;
  }
  return seaPlan(ageId, theme);
}

function stops(p){
  const out = [{id:"circle", lane:"Morning circle", name:"Circle time", what:p.circle}];
  if (p.letterPlan) out.push({id:"letter", lane:"Letter of the week", name:"Letter " + p.letter, what:p.letterPlan});
  if (p.steam) out.push(Object.assign({id:"steam", lane:"STEAM"}, p.steam));
  (p.crafts || []).forEach((c, i) => out.push(Object.assign({id:"craft-" + i, lane:"Arts & crafts"}, c)));
  (p.activities || []).forEach((a, i) => out.push(Object.assign({id:"act-" + i, lane:a.group ? "Activity · " + a.group : "Activity"}, a)));
  return out;
}
function stop(s, i){
  const sup = s.supplies && s.supplies.length ? `<ul class="chips">${s.supplies.map((x, n) => `<li><span data-ed="${s.id}|sup-${n}">${esc(x)}</span></li>`).join("")}</ul>` : "";
  const why = s.why ? `<p class="why">Why it matters: <span data-ed="${s.id}|why">${esc(s.why)}</span></p>` : "";
  const notes = devHtml(s);
  const whybox = (s.why || s.dev) ? `<div class="whybox">${why}${notes}</div>` : "";
  const img = mediaUrl(s.img);
  return `<section class="stop"><div class="dot">${i + 1}</div><div class="lane">${esc(s.lane)}</div>
    <div class="box${img ? "" : " noimg"}"><div class="txt"><h2 data-ed="${s.id}|name">${esc(s.name)}</h2>${whybox}<p class="what" data-ed="${s.id}|what">${esc(s.desc || s.what || "")}</p>${sup}</div>${img ? `<img src="${esc(img)}" alt="${esc(s.name)}" loading="lazy">` : ""}</div></section>`;
}

function setAges(html){ const n = $("#ages"); if (n) n.innerHTML = html || ""; }

function dashboard(){
  setAges("");
  $("#app").innerHTML = `<div class="hero homehero"><div><p class="kick">Davie Academy</p><h1>Pick a classroom</h1><p>Each age group has its own themes and day plans.</p></div></div>
    <div class="pick">${AGES.map(a => {
      const fall = fallPlans().find(x => x.ageId === a.id);
      const img = mediaUrl((fall && fall.steam && fall.steam.img) || ("media/chars/" + a.char));
      return `<a href="${themesHref(a.id)}" style="--c:${a.color}"><img src="${esc(img)}" alt="" loading="lazy"><b>${esc(a.name)}</b><span class="sub">${esc(a.sub)}</span></a>`;
    }).join("")}</div>`;
}

function themesPage(ageId){
  const a = findAge(ageId);
  if (!a) return dashboard();
  setAges(AGES.map(x => `<a href="${themesHref(x.id)}" class="${x.id === ageId ? "on" : ""}">${esc(x.name)}</a>`).join(""));
  const groups = monthGroups().map(m => `<section class="monthblock"><h2>${esc(m.title)}</h2><div class="themelist">${m.themes.map(t =>
    `<a class="themerow" style="--c:${a.color}" href="${themeHref(ageId, t)}"><span class="ic">${t.icon}</span><span class="tt">${esc(t.theme)}</span><span class="sb">${esc(t.letter)}</span><span class="go" aria-hidden="true">›</span></a>`
  ).join("")}</div></section>`).join("");
  $("#app").innerHTML = `<p class="crumb"><a href="#/">Home</a> › ${esc(a.name)}</p>
    <section class="agehead"><img src="${esc(mediaUrl("media/chars/" + a.char))}" alt="">
      <div><p class="kick">${esc(a.sub)}</p><h1>${esc(a.name)}</h1><p>Pick a theme to see the day plan.</p></div></section>
    ${groups}`;
}

function timelinePage(ageId, theme){
  const a = findAge(ageId);
  const p = planFor(ageId, theme);
  if (!a || !p) return themesPage(ageId);
  setAges(AGES.map(x => `<a href="${themeHref(x.id, theme)}" class="${x.id === ageId ? "on" : ""}">${esc(x.name)}</a>`).join(""));
  $("#app").innerHTML = `<p class="crumb"><a href="#/">Home</a> › <a href="${themesHref(ageId)}">${esc(a.name)}</a> › ${esc(p.theme)}</p>
    <div class="hero"><div class="letter">${esc(p.letter)}</div><div><small>${esc(p.age)}</small><h1>${esc(p.theme)}</h1><p>${esc(p.overview)}</p></div></div>
    <div class="tl">${stops(p).map(stop).join("")}</div>`;
}

function render(){
  if (redirectClassic()) return;
  const p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  let ageId = "", theme = null, view = "home";
  if (p[0] === "age" && isAge(p[1]) && !p[2]) {
    view = "themes"; ageId = p[1];
  } else if (isAge(p[0]) && !p[1]) {
    view = "timeline"; ageId = p[0]; theme = findTheme(FALL_SLUG);
  } else if (isAge(p[0]) && p[1]) {
    theme = findTheme(p[1]);
    ageId = p[0];
    view = theme ? "timeline" : "themes";
  }
  if (view === "themes") themesPage(ageId);
  else if (view === "timeline") timelinePage(ageId, theme);
  else dashboard();
  scrollTo(0, 0);
  if (window.ALT2Edit) ALT2Edit.mount(view === "timeline" ? ageId : "", theme && view === "timeline" ? theme.week : "");
}
addEventListener("hashchange", render); render();
})();
