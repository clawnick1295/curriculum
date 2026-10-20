/* Small render components returning HTML strings */
DA.CH = {owl:"media/chars/owl.webp", sampson:"media/chars/sampson.webp", art:"media/chars/flamingo_art.webp", music:"media/chars/parrot_music.webp", movement:"media/chars/frog_movement.webp", science:"media/chars/turtle_science.webp", literacy:"media/chars/panther_literacy.webp", math:"media/chars/crab_math.webp"};
DA.AGE_CH = {ones:"sampson", twos:"movement", threes:"science", vpk:"owl", fours:"literacy", fives:"math"};
DA.ACT_CH = {circle:"literacy", story:"literacy", art:"art", sensory:"science", movement:"movement", music:"music", math:"math", steam:"science", letter:"owl", craft:"art", activity:"math", song:"music", home:"sampson", ask:"owl"};
DA.ui = {
  ch(key, cls){ const k=DA.ACT_CH[key]||key, src=DA.CH[k]; return src?`<img class="ch ${cls||""}" src="${src}" alt="" aria-hidden="true" loading="lazy" decoding="async">`:""; },
  esc: s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])),
  qr(text, cell=4){ try{ const q=qrcode(0,'M'); q.addData(text); q.make(); return q.createSvgTag({cellSize:cell, margin:2}); }catch(e){ return "<div class='qr-missing'>QR</div>"; } },
  video(url, poster){
    if(!url) return `<div class="video-ph">${DA.ui.ch("music","sm")}<small>Activity video coming soon</small></div>`;
    const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
    return yt ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" allowfullscreen></iframe></div>`
              : `<video class="video" controls playsinline preload="metadata" ${poster||/\.mp4$/.test(url)?`poster="${DA.ui.esc(poster||url.replace(/\.mp4$/,"_poster.jpg"))}"`:""} src="${DA.ui.esc(url)}"></video>`;
  },
  song(w){ if(!w.songVideo && !w.character) return "";
    return `<section class="card songcard"><h3 class="hh">${DA.ui.ch("music","hd")}Theme song${w.character?` with ${w.character.name}`:""}</h3>
      <div class="songgrid">${w.songVideo?DA.ui.video(w.songVideo,w.songPoster):""}
      ${w.character?`<figure class="char"><img src="${DA.ui.esc(w.character.image)}" alt="${DA.ui.esc(w.character.name)}" loading="lazy"><figcaption>${w.character.name}</figcaption></figure>`:""}</div>
      <p class="lyrics">${w.song}</p></section>`; },
  words(words){ return `<ul class="words">${words.map(([en,es])=>`<li><b>${en}</b><span>${es}</span></li>`).join("")}</ul>`; },
  ofWeek(of){ return `<div class="ofweek">${Object.entries(of).map(([k,v])=>`<div class="chip"><small>${k} of the week</small><b>${v}</b></div>`).join("")}</div>`; },
  activity(a, i, ctx){
    return `<article class="card act act-${a.key}">
      <header class="hh">${DA.ui.ch(a.key,"hd")}<div><span class="tag">${a.label}</span><h3>${a.title}</h3></div></header>
      <p>${a.steps}</p>
      <h4>Materials</h4>
      ${DA.ui.supplies(a.materials)}
      ${DA.ui.video(a.video)}
    </article>`;
  },
  brand(sub){ return `<a class="brand" href="#/"><img class="logoimg" src="logo.svg" alt="Davie Academy"><small>${sub||"Curriculum Dashboard"}</small></a>`; },
  /* One place to build shopping links. Search links don't go stale; add DA_CONFIG.AMAZON_TAG later for Associates. */
  amazonUrl(item){ const t=(DA_CONFIG.AMAZON_TAG||"").trim(); return "https://www.amazon.com/s?k="+encodeURIComponent(item)+(t?"&tag="+encodeURIComponent(t):""); },
  buy(item){ return `<a class="buy" href="${DA.ui.amazonUrl(item)}" target="_blank" rel="noopener" aria-label="Find ${DA.ui.esc(item)} on Amazon" title="Find on Amazon">🛒</a>`; },
  supplies(list){ return `<ul class="checklist">${list.map(m=>`<li><label><input type="checkbox"> ${m}</label>${DA.ui.buy(m)}</li>`).join("")}</ul>`; },
  photo(src,alt,note){ return src?`<figure class="photo"><img src="${src}" alt="${DA.ui.esc(alt)}" loading="lazy">${note?`<figcaption>${note}</figcaption>`:""}</figure>`:""; }
};
