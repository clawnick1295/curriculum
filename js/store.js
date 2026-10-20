/* Data layer: reads go through DA.data. Checklist and Observed marks stay in localStorage. */
window.DA = window.DA || {};

function daParseDate(s){
  const [y, m, d] = String(s).split("-").map(Number);
  return new Date(y, m - 1, d);
}
function daAddDays(date, n){
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + n);
  return d;
}
function daMonday(date){
  const day = date.getDay();
  return daAddDays(date, day === 0 ? -6 : 1 - day);
}
const DA_MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

DA.data = {
  ages: () => DA_AGES,
  age: id => DA_AGES.find(a => a.id === id),
  months: () => DA_MONTHS,
  findWeek(monthId, n){ const m = DA_MONTHS.find(x => x.id === monthId); return m && m.weeks.find(w => w.n == n); },
  weekFor(ageId, monthId, n){
    const age = this.age(ageId), w = this.findWeek(monthId, n); if (!age || !w) return null;
    const t = Object.assign({}, w.byTier[age.tier], (w.byAge || {})[ageId] || {});
    const acts = ["circle","story","art","sensory","movement"].map(k => ({key: k, label: DA.data.ACT_LABELS[k], ...(t[k] || {})}));
    return {age, month: DA_MONTHS.find(x => x.id === monthId), week: w, focus: t.focus, of: t.of, acts};
  },
  ACT_LABELS: {circle: "Circle Time", story: "Story", art: "Art", sensory: "Sensory / Science", movement: "Movement"},
  yearWeekForSample(ageId, monthId, n){
    const links = (window.DA_WEEK_LINKS && DA_WEEK_LINKS[ageId]) || {};
    for (const wn of Object.keys(links)) {
      const s = links[wn] && links[wn].sample;
      if (s && s[0] === monthId && String(s[1]) === String(n)) return Number(wn);
    }
    return null;
  },
  yearWeekForPlan(planId){
    const links = window.DA_WEEK_LINKS || {};
    for (const ageId of Object.keys(links)) {
      for (const wn of Object.keys(links[ageId])) {
        if (links[ageId][wn] && links[ageId][wn].plan === planId) return {ageId, n: Number(wn)};
      }
    }
    return null;
  },
  parentUrl(ageId, monthId, n){
    const mapped = this.yearWeekForSample(ageId, monthId, n);
    if (mapped) return `${DA_CONFIG.PARENT_BASE_URL}#/parent/${ageId}/w/${mapped}`;
    return `${DA_CONFIG.PARENT_BASE_URL}#/parent/${ageId}/${monthId}/${n}`;
  },
  parentUrlForWeek(ageId, weekN){ return `${DA_CONFIG.PARENT_BASE_URL}#/parent/${ageId}/w/${weekN}`; },
  yearStartMonday(){ return daMonday(daParseDate(DA_CONFIG.SCHOOL_YEAR_START)); },
  weekStart(n){ return daAddDays(this.yearStartMonday(), (Number(n) - 1) * 7); },
  weekRange(n){
    const mon = this.weekStart(n), fri = daAddDays(mon, 4);
    const md = d => DA_MONTH_NAMES[d.getMonth()].slice(0, 3) + " " + d.getDate();
    let label = md(mon) + "–" + fri.getDate();
    if (mon.getFullYear() !== fri.getFullYear()) label = md(mon) + ", " + mon.getFullYear() + "–" + md(fri) + ", " + fri.getFullYear();
    else if (mon.getMonth() !== fri.getMonth()) label = md(mon) + "–" + md(fri);
    return {mon, fri, label};
  },
  currentWeekNumber(today){
    const start = this.yearStartMonday();
    const t = daMonday(today || new Date());
    const diff = Math.round((t - start) / 86400000);
    return Math.floor(diff / 7) + 1;
  },
  monthGroups(){
    const groups = [];
    for (let n = 1; n <= 52; n++) {
      const mon = this.weekStart(n);
      const key = mon.getFullYear() + "-" + (mon.getMonth() + 1);
      const last = groups[groups.length - 1];
      if (!last || last.key !== key) {
        if (groups.length >= 12) { groups[11].weeks.push(n); continue; }
        groups.push({key, month: mon.getMonth() + 1, name: DA_MONTH_NAMES[mon.getMonth()], year: mon.getFullYear(), weeks: [n]});
      } else last.weeks.push(n);
    }
    return groups;
  },
  monthHeader(month){
    const theme = (window.DA_MONTH_THEMES && DA_MONTH_THEMES[month]) || "";
    const name = DA_MONTH_NAMES[month - 1] || "";
    return theme ? `${name}: ${theme}` : name;
  },
  themeAt(ageId, n){
    const arr = (window.DA_WEEK_THEMES && DA_WEEK_THEMES[ageId]) || [];
    return String(arr[n - 1] || "").trim();
  },
  act(slot, day, title, steps, materials, extra){
    extra = extra || {};
    return {
      slot, day: day || "", title: title || "", steps: steps || "",
      materials: materials || [],
      standards: extra.standards || "",
      video: extra.video || "",
      image: extra.image || "",
      imageNote: extra.imageNote || ""
    };
  },
  emptyModel(age, n, theme, range){
    return {
      age, weekN: n, range, theme: theme || "", ready: false,
      letter: "", number: "", shape: "", color: "", words: [], song: "", songVideo: "", songPoster: "",
      book: null, character: null, activities: [], focus: null, home: [], ask: [], overview: "",
      objectives: null, letterPlan: "", plan: null, sample: null, room: "", subtitle: ""
    };
  },
  weekModel(ageId, n){
    n = Number(n);
    const age = this.age(ageId);
    if (!age || !(n >= 1 && n <= 52)) return null;
    const themeName = this.themeAt(ageId, n);
    const range = this.weekRange(n);
    const link = (window.DA_WEEK_LINKS && DA_WEEK_LINKS[ageId] && DA_WEEK_LINKS[ageId][n]) || null;
    let model = null;
    if (link && link.plan) {
      const plan = (window.DA_PLANS || []).find(p => p.id === link.plan && !p.hidden);
      if (plan) model = this.modelFromPlan(age, n, plan, themeName, range);
    }
    if (!model && link && link.sample) model = this.modelFromSample(age, n, link.sample[0], link.sample[1], themeName, range);
    if (!model) model = this.emptyModel(age, n, themeName, range);
    return this.attachBits(model);
  },
  attachBits(model){
    if (!model) return model;
    const n = Number(model.weekN);
    const month = model.range && model.range.mon ? model.range.mon.getMonth() + 1 : 0;
    model.sign = (window.DA_SIGNS && DA_SIGNS[n]) || null;
    model.spanishWord = (window.DA_SPANISH_WORDS && DA_SPANISH_WORDS[n]) || null;
    model.feelings = (window.DA_OLLIE && DA_OLLIE[n]) || null;
    const heart = month && window.DA_HEART && DA_HEART[month];
    model.heart = heart && (heart.en || heart.es) ? heart : null;
    if (model.challenge && typeof model.challenge === "string" && window.DA_CHALLENGE_ES && DA_CHALLENGE_ES[n]) model.challenge = { en: model.challenge, es: DA_CHALLENGE_ES[n] };
    else if (!model.challenge && window.DA_CHALLENGES && DA_CHALLENGES[n]) model.challenge = DA_CHALLENGES[n];
    if (!model.songEsVideo) model.songEsVideo = "";
    return model;
  },
  modelFromSample(age, weekN, monthId, sampleN, themeName, range){
    const v = this.weekFor(age.id, monthId, sampleN);
    if (!v) return null;
    const w = v.week;
    const activities = [];
    const story = (v.acts || []).find(a => a.key === "story" && a.title);
    (v.acts || []).forEach(a => {
      const slot = {circle: "circle", art: "art", sensory: "centers", movement: "movement"}[a.key];
      if (!slot || !a.title) return;
      activities.push(this.act(slot, "", a.title, a.steps, a.materials, a));
    });
    return {
      age, weekN, range: range || null,
      theme: themeName || w.theme, subtitle: "", overview: w.overview || "",
      letter: (v.of && v.of.letter) || "",
      number: (v.of && v.of.number) || "",
      shape: (v.of && v.of.shape) || "",
      color: (v.of && v.of.color) || "",
      words: w.words || [],
      song: w.song || "", songVideo: w.songVideo || "", songPoster: w.songPoster || "",
      book: story ? {title: story.title, detail: story.steps || "", materials: story.materials || [], standards: story.standards || "", video: story.video || ""} : null,
      character: w.character || null,
      activities, focus: v.focus || null,
      home: w.home || [], ask: w.ask || [],
      objectives: null, letterPlan: "", plan: null,
      sample: {monthId, n: Number(sampleN)},
      room: "", ready: true,
      challenge: w.challenge || ""
    };
  },
  modelFromPlan(age, weekN, plan, themeName, range){
    const activities = [];
    const slotOf = (window.DA_PLAN_SLOTS && DA_PLAN_SLOTS[plan.id] && DA_PLAN_SLOTS[plan.id].activities) || [];
    if (plan.circle) activities.push(this.act("circle", "", "Circle time", plan.circle, []));
    if (plan.steam) activities.push(this.act("centers", "", plan.steam.name, plan.steam.desc, plan.steam.supplies || [], {image: plan.steam.img, standards: plan.steam.standards}));
    (plan.crafts || []).forEach(c => activities.push(this.act("art", "", c.name, c.desc || "", c.supplies || [], {image: c.img, standards: c.standards})));
    (plan.activities || []).forEach((a, i) => activities.push(this.act(slotOf[i] || "centers", "", a.name, a.desc, a.supplies || [], {image: a.img, imageNote: a.imgNote, standards: a.standards})));
    if (plan.days) {
      Object.keys(plan.days).forEach(day => {
        (plan.days[day] || []).forEach(text => activities.push(this.act("circle", day, text, "", [])));
      });
    }
    const words = (plan.words || []).map(w => Array.isArray(w) ? w : [w, ""]).filter(w => w[0]);
    const theme = themeName || plan.short || plan.theme;
    return {
      age, weekN, range,
      theme, subtitle: plan.theme && plan.theme !== theme ? plan.theme : "",
      overview: plan.overview || "",
      banner: plan.banner || "",
      letter: plan.letter || "",
      number: plan.number || "", shape: plan.shape || "", color: plan.color || "",
      words, song: plan.song || "", songVideo: plan.songVideo || "", songPoster: plan.songPoster || "",
      book: null, character: null,
      activities, focus: null,
      home: plan.home || [], ask: plan.ask || [],
      objectives: plan.objectives || null,
      letterPlan: plan.letterPlan || "",
      plan, sample: null,
      room: plan.room || "",
      ready: true
    };
  }
};

DA.CHECK_ITEMS = [["acts","All 5 activities done"],["fridge","Fridge card sent home"],["msg","Weekly parent message sent"],["canva","Canva plan uploaded"]];
DA.store = {
  key: (a, m, n) => `da-check:${a}:${m}:${n}`,
  get(a, m, n){ try { return JSON.parse(localStorage.getItem(this.key(a, m, n))) || {}; } catch (e) { return {}; } },
  set(a, m, n, obj){ try { localStorage.setItem(this.key(a, m, n), JSON.stringify(obj)); } catch (e) {} },
  obsKey: (a, n, id) => `da-obs:${a}:${n}:${id}`,
  obsGet(a, n, id){ try { return localStorage.getItem(this.obsKey(a, n, id)) === "1"; } catch (e) { return false; } },
  obsSet(a, n, id, on){ try { localStorage.setItem(this.obsKey(a, n, id), on ? "1" : "0"); } catch (e) {} }
};
