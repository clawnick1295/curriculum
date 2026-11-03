(function(){
const $ = s => document.querySelector(s);
const AREAS = [["social","Social"],["emotional","Emotional"],["physical","Physical"],["cognitive","Cognitive"],["language","Language"]];
const devHtml = s => s.dev ? `<ul class="dev">${AREAS.filter(([k]) => s.dev[k]).map(([k, l]) => `<li class="d-${k}"><b>${l}</b> ${esc(s.dev[k])}</li>`).join("")}</ul>` : "";
const esc = s => String(s || "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plans = window.FALL || [];
function stops(p){
  const out = [{lane:"Morning circle", name:"Circle time", what:p.circle}];
  if (p.letterPlan) out.push({lane:"Letter of the week", name:"Letter " + p.letter, what:p.letterPlan});
  if (p.steam) out.push(Object.assign({lane:"STEAM"}, p.steam));
  p.crafts.forEach(c => out.push(Object.assign({lane:"Arts & crafts"}, c)));
  p.activities.forEach(a => out.push(Object.assign({lane:a.group ? "Activity · " + a.group : "Activity"}, a)));
  return out;
}
function stop(s, i){
  const sup = s.supplies && s.supplies.length ? `<ul class="chips">${s.supplies.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  return `<section class="stop"><div class="dot">${i + 1}</div><div class="lane">${esc(s.lane)}</div>
    <div class="box${s.img ? "" : " noimg"}"><div class="txt"><h2>${esc(s.name)}</h2>${s.why || s.dev ? `<div class="whybox"><p class="why">Why it matters: ${esc(s.why || "")}</p>${devHtml(s)}</div>` : ""}<p class="what">${esc(s.desc || s.what)}</p>${sup}</div>${s.img ? `<img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy">` : ""}</div></section>`;
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
}
addEventListener("hashchange", render); render();
})();
