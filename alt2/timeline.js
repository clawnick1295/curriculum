(function(){
const $ = s => document.querySelector(s);
const AREAS = [["social","Social"],["emotional","Emotional"],["physical","Physical"],["cognitive","Cognitive"],["language","Language"]];
const devHtml = s => s.dev ? `<ul class="dev">${AREAS.filter(([k]) => s.dev[k]).map(([k, l]) => `<li class="d-${k}"><b>${l}</b> <span data-ed="${s.id}|dev-${k}">${esc(s.dev[k])}</span></li>`).join("")}</ul>` : "";
const esc = s => String(s || "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plans = window.FALL || [];
function stops(p){
  const out = [{id:"circle", lane:"Morning circle", name:"Circle time", what:p.circle}];
  if (p.letterPlan) out.push({id:"letter", lane:"Letter of the week", name:"Letter " + p.letter, what:p.letterPlan});
  if (p.steam) out.push(Object.assign({id:"steam", lane:"STEAM"}, p.steam));
  p.crafts.forEach((c, i) => out.push(Object.assign({id:"craft-" + i, lane:"Arts & crafts"}, c)));
  p.activities.forEach((a, i) => out.push(Object.assign({id:"act-" + i, lane:a.group ? "Activity · " + a.group : "Activity"}, a)));
  return out;
}
function stop(s, i){
  const sup = s.supplies && s.supplies.length ? `<ul class="chips">${s.supplies.map((x, n) => `<li><span data-ed="${s.id}|sup-${n}">${esc(x)}</span></li>`).join("")}</ul>` : "";
  const why = s.why ? `<p class="why">Why it matters: <span data-ed="${s.id}|why">${esc(s.why)}</span></p>` : "";
  const notes = devHtml(s);
  const whybox = (s.why || s.dev) ? `<div class="whybox">${why}${notes}</div>` : "";
  return `<section class="stop"><div class="dot">${i + 1}</div><div class="lane">${esc(s.lane)}</div>
    <div class="box${s.img ? "" : " noimg"}"><div class="txt"><h2 data-ed="${s.id}|name">${esc(s.name)}</h2>${whybox}<p class="what" data-ed="${s.id}|what">${esc(s.desc || s.what || "")}</p>${sup}</div>${s.img ? `<img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy">` : ""}</div></section>`;
}
function render(){
  const id = location.hash.replace(/^#\/?/, "");
  const p = plans.find(x => x.ageId === id);
  $("#ages").innerHTML = plans.map(x => `<a href="#/${x.ageId}" class="${x === p ? "on" : ""}">${esc(x.age)}</a>`).join("");
  if (!p) {
    $("#app").innerHTML = `<div class="hero"><div class="letter">Ll</div><div><small>Week 9</small><h1>Pick a classroom</h1><p>Each age group has its own day plan.</p></div></div>
      <div class="pick">${plans.map(x => `<a href="#/${x.ageId}"><img src="${esc(x.steam.img)}" alt="" loading="lazy"><b>${esc(x.age)}</b></a>`).join("")}</div>`;
  } else {
    $("#app").innerHTML = `<div class="hero"><div class="letter">${esc(p.letter)}</div><div><small>${esc(p.age)} · Week 9</small><h1>${esc(p.theme)}</h1><p>${esc(p.overview)}</p></div></div>
      <div class="tl">${stops(p).map(stop).join("")}</div>`;
  }
  scrollTo(0, 0);
  if (window.ALT2Edit) ALT2Edit.mount(p ? p.ageId : "");
}
addEventListener("hashchange", render); render();
})();
