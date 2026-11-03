(function(){
const root = document.getElementById("book");
const esc = s => String(s || "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const books = window.BOOK || [];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function spread(s, n, label){
  const sup = s.supplies && s.supplies.length ? `<h3>You'll need</h3><ul>${s.supplies.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  return `<section class="page spread"><div class="ph"><img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy"><span class="tag">${esc(label)}</span></div>
    <div class="copy"><p class="num">${n}</p><h2>${esc(s.name)}</h2>${s.why ? `<p class="why">${esc(s.why)}</p>` : ""}<p class="what">${esc(s.desc)}</p>${sup}</div></section>`;
}
function bookPages(p){
  const pg = [`<section class="page cover"><div><img class="owl" src="owl.svg" alt="Davie Academy"><p class="kick">${esc(p.age)} · Week 9</p><p class="big">${esc(p.letter)}</p><h1>${esc(p.theme)}</h1><p>${esc(p.overview)}</p></div></section>`];
  const text = [];
  if (p.circle) text.push(`<h3>Circle time</h3><p class="what dropcap">${esc(p.circle)}</p>`);
  if (p.letterPlan) text.push(`<h3>Letter of the week · ${esc(p.letter)}</h3><p class="what">${esc(p.letterPlan)}</p>`);
  if (text.length) pg.push(`<section class="page text"><div class="copy">${text.join("")}</div></section>`);
  let n = 1;
  if (p.steam) pg.push(spread(p.steam, n++, "STEAM"));
  p.crafts.forEach(c => pg.push(spread(c, n++, "Arts & Crafts")));
  p.activities.forEach(a => pg.push(spread(a, n++, a.group ? "Activity · " + a.group : "Activity")));
  pg.push(`<section class="page end"><div><img class="owl" src="owl.svg" alt="" style="width:80px;background:#fff;border-radius:50%;padding:8px"><h1 style="font-style:italic;font-weight:400">The end of Week 9</h1><p><a href="#/" style="color:var(--navy);font-weight:700">← Back to the bookshelf</a></p></div></section>`);
  return pg;
}
function render(){
  const id = location.hash.replace(/^#\/?/, "");
  const p = books.find(b => b.ageId === id);
  if (!p) {
    root.innerHTML = `<div class="shelf"><img class="owl" src="owl.svg" alt="Davie Academy"><h1>Our Fall Storybooks</h1><div class="books">${books.map(b => `<a href="#/${b.ageId}"><img src="${esc(b.crafts[0].img)}" alt="" loading="lazy"><span><b>${esc(b.age)}</b>${esc(b.theme)}</span></a>`).join("")}</div></div>`;
    return;
  }
  const pages = bookPages(p);
  root.innerHTML = `<div class="pages" id="pages">${pages.join("")}</div>
    <div class="ctrl"><a href="#/" aria-label="Bookshelf">☰</a><button id="prev" aria-label="Previous page">‹</button><span class="pg" id="pg" style="display:inline-grid;place-items:center;height:48px;border-radius:999px;background:#fff;font:800 1rem system-ui;padding:0 1rem">1 / ${pages.length}</span><button id="next" aria-label="Next page">›</button></div>`;
  const box = document.getElementById("pages");
  const cur = () => Math.round(box.scrollLeft / box.clientWidth);
  const go = i => box.scrollTo({left: Math.max(0, Math.min(pages.length - 1, i)) * box.clientWidth, behavior: reduce ? "auto" : "smooth"});
  document.getElementById("prev").onclick = () => go(cur() - 1);
  document.getElementById("next").onclick = () => go(cur() + 1);
  box.addEventListener("scroll", () => { document.getElementById("pg").textContent = `${cur() + 1} / ${pages.length}`; }, {passive: true});
}
addEventListener("keydown", e => { const b = document.getElementById("next"); if (!b) return; if (e.key === "ArrowRight") b.click(); if (e.key === "ArrowLeft") document.getElementById("prev").click(); });
addEventListener("hashchange", render); render();
})();
