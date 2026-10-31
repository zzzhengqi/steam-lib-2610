(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };
  var body = document.body, root = document.documentElement;
  var device = $("device"), homeL = $("homeL"), homeR = $("homeR"), lock = $("lock"), lockM = $("lockM"), hint = $("hint");
  var app = $("app"), appBg = $("appBg"), appTitle = $("appTitle"), appBody = $("appBody");
  var spot = $("spot"), spotQ = $("spotQ"), spotRes = $("spotRes"), toastEl = $("toast");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* ---------------- 图标：短名、配色、线条图形 ---------------- */
  var ICON = {
    notice:    { s: "会员须知", g: ["#ff6b5e", "#ff3b30"], p: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>' },
    map:       { s: "学习地图", g: ["#ffffff", "#f1f1f4", "#34c759"], p: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><path d="M8 2v16"/><path d="M16 6v16"/>' },
    course:    { s: "主修课",   g: ["#ffb340", "#ff9500"], p: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>' },
    install:   { s: "Win 安装", g: ["#48484a", "#1c1c1e"], p: '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M6 9l3 3-3 3"/><path d="M12 15h6"/>' },
    mac:       { s: "Mac 安装", g: ["#ffffff", "#f1f1f4", "#1d1d1f"], p: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M1 20h22"/>' },
    cases:     { s: "场景案例", g: ["#ffffff", "#f1f1f4", "#af52de"], p: '<path d="M12 2l10 5-10 5L2 7l10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>' },
    skills:    { s: "精选Skill", g: ["#4b4f8c", "#25275a"], p: '<path d="M19.44 7.85c-.05.32.06.65.29.88l1.57 1.57c.47.47.7 1.09.7 1.7s-.23 1.24-.7 1.71l-1.61 1.61a.98.98 0 0 1-.84.28c-.47-.07-.8-.48-.97-.93a2.5 2.5 0 1 0-3.21 3.21c.45.17.86.5.93.97a.98.98 0 0 1-.28.84l-1.61 1.61a2.4 2.4 0 0 1-3.41 0l-1.57-1.57a1.03 1.03 0 0 0-.88-.29c-.49.07-.84.5-1.02.97a2.5 2.5 0 1 1-3.24-3.24c.46-.18.9-.53.97-1.02a1.03 1.03 0 0 0-.29-.88L2.7 13.7a2.4 2.4 0 0 1 0-3.41L4.23 8.77c.24-.24.58-.35.92-.3.51.08.88.53 1.07 1.01a2.5 2.5 0 1 0 3.26-3.26c-.48-.2-.93-.56-1.01-1.07-.05-.34.06-.68.3-.92L10.3 2.7a2.4 2.4 0 0 1 3.41 0l1.57 1.57c.23.23.56.34.88.29.49-.07.84-.5 1.02-.97a2.5 2.5 0 1 1 3.24 3.24c-.46.18-.9.53-.97 1.02z"/>' },
    learn:     { s: "学习资源", g: ["#d1a679", "#a8794c"], p: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z"/>' },
    practice:  { s: "实操篇",   g: ["#a7a7ad", "#7c7c82"], p: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
    cognition: { s: "认知篇",   g: ["#ffffff", "#f1f1f4", "#ff9f0a"], p: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>' },
    projects:  { s: "源码案例", g: ["#45a6ff", "#007aff"], p: '<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>' },
    live:      { s: "直播回放", g: ["#ff5c7c", "#ff2d55"], p: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>' },
    tools:     { s: "工具下载", g: ["#7d7bf2", "#5856d6"], p: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>' },
    prompts:   { s: "提示词",   g: ["#5fd3e6", "#30b0c7"], p: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>' },
    knowledge: { s: "知识速查", g: ["#ffffff", "#f1f1f4", "#ff9500"], p: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
    faq:       { s: "常见问题", g: ["#5ac8fa", "#0a84ff"], p: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>' },
    safety:    { s: "安全守则", g: ["#5fdd7c", "#30b14f"], p: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>' },
    glossary:  { s: "术语表",   g: ["#cf7dfb", "#af52de"], p: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M20 17v5H6.5A2.5 2.5 0 0 1 4 19.5"/>' }
  };
  var SEARCH_P = '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>';
  var DOCK = ["course", "prompts", "faq"];
  var SEC = {}; S.sections.forEach(function (s) { SEC[s.id] = s; });
  function meta(sec) { return ICON[sec.id] || { s: sec.title, g: ["#ff9a4d", "#f97316"], p: null }; }
  function glyph(sec) { var m = meta(sec); return m.p ? '<svg viewBox="0 0 24 24">' + m.p + "</svg>" : '<span class="emo">' + sec.icon + "</span>"; }
  function gvars(sec) { var g = meta(sec).g; return "--g1:" + g[0] + ";--g2:" + g[1] + ";--gc:" + (g[2] || "#fff"); }

  /* 把高频的指针事件合并到每帧一次，保证低配电脑也流畅 */
  function rafThrottle(fn) {
    var ev = null, pend = false;
    return function (e) { ev = e; if (pend) return; pend = true; requestAnimationFrame(function () { pend = false; fn(ev); }); };
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function plain(h) { return String(h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }

  /* ---------------- 内容渲染（每种板块类型） ---------------- */
  var STATUS = { done: ["已完成", "b-done"], wip: ["制作中", "b-wip"], plan: ["规划中", "b-plan"] };
  function badge(s) { var m = STATUS[s]; return m ? '<span class="badge ' + m[1] + '">' + m[0] + "</span>" : ""; }
  function tags(a) { return a && a.length ? '<div class="tags">' + a.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" : ""; }
  function btn(label, url, pri) {
    if (!url) return '<a class="btn" aria-disabled="true">' + esc(label) + "（待补充）</a>";
    return '<a class="btn' + (pri ? " pri" : "") + '" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + " ↗</a>";
  }
  function code(t) { return '<div class="codebox"><pre class="code">' + esc(t) + '</pre><button class="btn copy" type="button">复制</button></div>'; }
  function ul(a, tag) { tag = tag || "ul"; return a && a.length ? "<" + tag + ">" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</" + tag + ">" : ""; }

  /* 表格、分级、补充说明：任何卡片都可以带 table / levels / list / note 字段 */
  function tbl(t) {
    if (!t || !t.rows) return "";
    var h = t.head ? "<thead><tr>" + t.head.map(function (x) { return "<th>" + esc(x) + "</th>"; }).join("") + "</tr></thead>" : "";
    var b = "<tbody>" + t.rows.map(function (r) { return "<tr>" + r.map(function (x, j) { return "<td" + (j === 0 ? ' class="k"' : "") + (t.head ? ' data-l="' + esc(t.head[j]) + '"' : "") + ">" + esc(x) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody>";
    return '<div class="tbl-wrap"><table class="tbl">' + h + b + "</table></div>";
  }
  function levels(a) {
    return a && a.length ? '<div class="lv">' + a.map(function (l) { return '<div class="lv-i lv-' + esc(l.c) + '"><b>' + esc(l.t) + "</b><span>" + esc(l.d) + "</span></div>"; }).join("") + "</div>" : "";
  }
  function extra(it) { return levels(it.levels) + ul(it.list) + tbl(it.table) + (it.note ? '<p class="note">' + esc(it.note) + "</p>" : ""); }
  function wide(it) { return it.wide ? " wide" : ""; }

  var R = {
    cards: function (it) { return { tag: "div", cls: "card" + (it.slot ? " slot" : "") + (it.hl ? " hl" : "") + wide(it), html: "<h3>" + esc(it.t) + "</h3><p>" + esc(it.d) + "</p>" + extra(it) }; },
    plan: function (it) { return { tag: "div", cls: "card", html: '<h3><span class="wk">' + esc(it.w) + "</span>" + esc(it.t) + "</h3>" + ul(it.list) }; },
    steps: function (it, i) {
      return { tag: "div", cls: "step", html: '<div class="num">' + (i + 1) + '</div><div class="body"><h3>' + esc(it.t) + "</h3><p>" + esc(it.d) + "</p>" + (it.code ? code(it.code) : "") + ul(it.list) + "</div>" };
    },
    links: function (it) { return { tag: "div", cls: "card" + (it.hl ? " hl" : "") + wide(it), html: '<div class="row"><h3>' + esc(it.name) + '</h3><span class="tag">' + esc(it.tag) + "</span></div><p>" + esc(it.desc) + "</p>" + extra(it) + (it.links ? '<div class="links">' + it.links.map(function (l) { return btn(l.label, l.url, false); }).join("") + "</div>" : it.noBtn ? "" : '<div class="links">' + btn(it.btn || "打开官网", it.url, true) + "</div>") }; },
    projects: function (it) {
      var ls = (it.links || []).map(function (l) { return btn(l.label, l.url, !!l.pri); }).join("");
      return { tag: "div", cls: "card" + (it.slot ? " slot" : ""), html: '<div class="row"><h3>' + esc(it.name) + "</h3>" + badge(it.status) + "</div>" + tags(it.tags) + "<p>" + esc(it.desc) + "</p>" + (ls ? '<div class="links">' + ls + "</div>" : "") };
    },
    videos: function (it) { return { tag: "div", cls: "card" + (it.slot ? " slot" : ""), html: '<div class="row"><h3>' + esc(it.title) + "</h3>" + badge(it.status) + "</div><p>" + esc(it.desc) + '</p><div class="links">' + btn("观看 / 获取", it.url, true) + "</div>" }; },
    prompts: function (it) { return { tag: "div", cls: "card" + wide(it), html: '<div class="row"><h3>' + esc(it.title) + "</h3>" + (it.meta || it.tag ? '<span class="tag">' + esc(it.meta || it.tag) + "</span>" : "") + "</div><p>" + esc(it.desc) + "</p>" + code(it.text) }; },
    lessons: function (it, i, sec) {
      var no = (sec.noLabel || "第{n}课").replace("{n}", i + 1);
      var b = '<div class="goal">目标：' + esc(it.goal) + "</div><h4>怎么做</h4>" + ul(it.steps, "ol") + "<h4>动手练习</h4><p>" + esc(it.practice) + "</p><h4>自检清单</h4>" + ul((it.check || []).map(function (c) { return "✓ " + c; }));
      return { tag: "details", cls: "", html: '<summary><span class="no">' + esc(no) + '</span><span class="tt">' + esc(it.title) + '</span></summary><div class="ans">' + b + "</div>" };
    },
    faq: function (it) { return { tag: "details", cls: "", html: '<summary><span class="tt">' + esc(it.q) + '</span></summary><div class="ans">' + it.a + "</div>" }; },
    safety: function (it, i) { return { tag: "div", cls: "card" + (it.hl ? " hl" : "") + wide(it), html: "<h3>" + (i + 1) + ". " + esc(it.t) + "</h3><p>" + esc(it.d) + "</p>" + extra(it) }; },
    skills: function (it) {
      return { tag: "div", cls: "card", html: '<div class="row"><h3>' + esc(it.title) + '</h3><span class="tag">' + esc(it.meta || it.tag) + "</span></div><p>" + esc(it.desc) + "</p>" + (it.code ? code(it.code) : "") + ul(it.list) + (it.url ? '<div class="links">' + btn("GitHub 主页", it.url, true) + "</div>" : "") };
    },
    glossary: function (it) { return { tag: "div", cls: "card", html: "<h3>" + esc(it.term) + "</h3><p>" + esc(it.def) + "</p>" }; }
  };
  var WRAP = { steps: '<div class="steps">', faq: "<div>", lessons: "<div>", plan: '<div class="plan">', prompts: '<div class="prompt-grid">', skills: '<div class="prompt-grid">', glossary: '<div class="gl">' };

  function renderSection(sec) {
    var out = (WRAP[sec.type] || '<div class="grid">');
    var chips = "";
    var idx = sec.items.map(function (_, i) { return i; });
    if (sec.filter) {
      var seen = {}, fl = Array.isArray(sec.filter) ? sec.filter.slice() : [];
      fl.forEach(function (t) { seen[t] = 1; });
      sec.items.forEach(function (it) { if (it.tag && !seen[it.tag]) { seen[it.tag] = 1; fl.push(it.tag); } });
      idx.sort(function (a, b) { return (fl.indexOf(sec.items[a].tag) - fl.indexOf(sec.items[b].tag)) || (a - b); });
      chips = '<div class="chips" role="group" aria-label="按类别筛选"><button class="chip on" type="button" data-f="">全部</button>' + fl.map(function (t) { return '<button class="chip" type="button" data-f="' + esc(t) + '">' + esc(t) + "</button>"; }).join("") + "</div>";
    }
    idx.forEach(function (i, n) {
      var it = sec.items[i];
      var r = (R[sec.type] || R.cards)(it, i, sec);
      out += "<" + r.tag + ' class="' + r.cls + ' item"' + (it.tag ? ' data-tag="' + esc(it.tag) + '"' : "") + ' data-k="' + sec.id + "-" + i + '" style="--d:' + (Math.min(n, 10) * 0.045 + 0.12).toFixed(3) + 's">' + r.html + "</" + r.tag + ">";
    });
    return '<div class="wrap"><h2>' + esc(sec.title) + '</h2><p class="intro">' + esc(sec.intro) + "</p>" + chips + out + '</div><p class="app-foot">蒸汽会员专属资源库 · 仅供会员本人学习使用，请勿转发或转卖 · 最近更新 ' + esc(S.updated || "") + "</p></div>";
  }

  /* ---------------- 搜索索引 ---------------- */
  var INDEX = [];
  S.sections.forEach(function (sec) {
    sec.items.forEach(function (it, i) {
      var title = it.title || it.t || it.name || it.q || it.term || it.w || "";
      var sub = it.desc || it.d || it.goal || it.def || plain(it.a) || (it.list || []).join("，");
      var tb = it.table ? (it.table.head || []).concat.apply([], it.table.rows).join(" ") : "";
      var lv = (it.levels || []).map(function (l) { return l.t + " " + l.d; }).join(" ");
      var all = [title, sub, tb, lv, it.note, it.text, it.code, plain(it.a), (it.steps || []).join(" "), it.practice, (it.list || []).join(" "), (it.tags || []).join(" "), it.tag, it.meta].join(" ").toLowerCase();
      INDEX.push({ sec: sec, i: i, title: title, sub: sub, all: all });
    });
  });

  /* ---------------- 主屏幕 ---------------- */
  var mobile = null;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var WK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  function nowStr() { var d = new Date(); return pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function dateStr() { var d = new Date(); return (d.getMonth() + 1) + "月" + d.getDate() + "日 " + WK[d.getDay()]; }
  var ico = {
    sig: '<svg viewBox="0 0 24 24"><path d="M4 18v-2M9 18v-5M14 18V9M19 18V5"/></svg>',
    wifi: '<svg viewBox="0 0 24 24"><path d="M2 8.8a15 15 0 0 1 20 0M5.5 12.4a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0"/><path d="M12 19.5h.01"/></svg>'
  };
  function statusBar(side) {
    var right = '<span class="ic">' + ico.sig + ico.wifi + '<span class="bat"><b></b></span></span>';
    if (side === "L") return '<div class="sb"><span class="clk">' + nowStr() + "</span><span>蒸汽</span></div>";
    if (side === "R") return '<div class="sb"><span></span>' + right + "</div>";
    return '<div class="sb"><span class="clk">' + nowStr() + "</span>" + right + "</div>";
  }
  function iconBtn(id, i, inDock) {
    var sec = SEC[id]; if (!sec) return "";
    return '<button class="ico" type="button" data-id="' + id + '" data-open="' + id + '" style="--i:' + i + '" aria-label="' + esc(sec.title) + '">' +
      '<span class="sq" style="' + gvars(sec) + '">' + glyph(sec) + '</span><span class="lb">' + esc(meta(sec).s) + "</span></button>";
  }
  function countOf(type) { var n = 0; S.sections.forEach(function (s) { if (s.type === type) n += s.items.filter(function (x) { return !x.slot; }).length; }); return n; }

  function widgets() {
    var map = SEC.map, prompts = SEC.prompts, course = SEC.course;
    var total = 0; S.sections.forEach(function (s) { total += s.items.length; });
    var W = {};
    W.clock = '<div class="wg w-clock" data-w="clock" style="--i:0"><div><div class="t clk">' + nowStr() + '</div><div class="d" id="wDate">' + dateStr() + '</div></div><div class="n"><small>STEAM</small>蒸汽会员<br>专属资源库</div></div>';
    if (map) {
      W.map = '<button class="wg w-map" type="button" data-w="map" data-open="map" style="--i:1"><div class="wh">30 天学习地图</div><ol>' +
        map.items.map(function (w, i) { return '<li><span>' + esc(w.w) + '</span><i style="--p:' + (100 - i * 18) + "%;--dl:" + (0.5 + i * 0.12) + 's"></i></li>'; }).join("") + "</ol></button>";
    }
    /* 资源总览：四个数字各自跳到对应板块；“条资料”打开全局搜索 */
    W.stats = '<div class="wg w-stats" data-w="stats" style="--i:2"><div class="wh">资源总览</div><div class="nums">' +
      [[course ? course.items.length : 0, "节主修课", ' data-open="course"'], [SEC.prompts ? SEC.prompts.items.length : 0, "条提示词", ' data-open="prompts"'],
       [SEC.cases ? SEC.cases.items.length : countOf("projects"), SEC.cases ? "个场景案例" : "个案例", SEC.cases ? ' data-open="cases"' : ' data-open="projects"'], [total, "条资料", ' data-spot="1"']]
        .map(function (n) { return '<button class="stat" type="button"' + n[2] + ' aria-label="' + n[0] + n[1] + '"><b data-count="' + n[0] + '">0</b><span>' + n[1] + "</span></button>"; }).join("") + "</div></div>";
    if (prompts && prompts.items.length) {
      var day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);
      var pi = day % prompts.items.length, p = prompts.items[pi];
      W.prompt = '<button class="wg w-prompt" type="button" data-w="prompt" data-open="prompts" data-item="' + pi + '" style="--i:3"><div class="wh">今日提示词</div><span class="go">打开 ›</span><div class="pt">' + esc(p.title) + '</div><div class="pd">' + esc(p.desc) + "</div></button>";
    }
    function mini(id, t, d, i) {
      var sec = SEC[id]; if (!sec) return "";
      return '<button class="wg w-mini" type="button" data-w="mini-' + id + '" data-open="' + id + '" style="--i:' + i + '"><span class="mi" style="' + gvars(sec) + '">' + glyph(sec) + "</span><span><b>" + t + "</b><small>" + d + "</small></span></button>";
    }
    W["mini-install"] = mini("install", "新手第一步", "15 分钟装好环境", 4);
    W["mini-faq"] = mini("faq", "遇到问题", "先查常见问题", 5);
    var keys = ordered(["clock", "map", "stats", "prompt", "mini-install", "mini-faq"], ORDER.w).filter(function (k) { return W[k]; });
    return '<div class="wgrid">' + keys.map(function (k) { return W[k]; }).join("") + "</div>";
  }
  function searchPill() {
    return '<button class="spill" type="button" data-spot="1"><svg viewBox="0 0 24 24">' + SEARCH_P + "</svg>搜索全部资料" + (mobile ? "" : "<kbd>/</kbd>") + "</button>";
  }
  /* ---------- 图标/组件排列：默认顺序 + 用户拖动后保存的顺序（仅存于本机浏览器） ---------- */
  var ORDER_KEY = "steam-home-order-v1";
  var ORDER = loadOrder();
  function loadOrder() { try { return JSON.parse(localStorage.getItem(ORDER_KEY)) || {}; } catch (e) { return {}; } }
  function saveOrder(o) { ORDER = o; try { localStorage.setItem(ORDER_KEY, JSON.stringify(o)); } catch (e) {} }
  function clearOrder() { ORDER = {}; try { localStorage.removeItem(ORDER_KEY); } catch (e) {} }
  function hasCustom() { return !!(ORDER.g || ORDER.d || ORDER.w); }
  /* 锁定排列：锁定后不能拖动，直到本人解除锁定或恢复默认 */
  var LOCK_KEY = "steam-home-lock-v1";
  var LOCKED = (function () { try { return localStorage.getItem(LOCK_KEY) === "1"; } catch (e) { return false; } })();
  function setLock(on) { LOCKED = !!on; try { if (on) localStorage.setItem(LOCK_KEY, "1"); else localStorage.removeItem(LOCK_KEY); } catch (e) {} }
  function ordered(def, saved) {
    if (!saved || !saved.length) return def.slice();
    var out = saved.filter(function (k) { return def.indexOf(k) > -1; });
    def.forEach(function (k) { if (out.indexOf(k) < 0) out.push(k); });
    return out;
  }
  function layoutIds() {
    var all = S.sections.map(function (s) { return s.id; });
    var dockDef = ["search"].concat(DOCK.filter(function (id) { return SEC[id]; }));
    var d = ORDER.d ? ORDER.d.filter(function (k) { return k === "search" || SEC[k]; }) : dockDef;
    var g = ordered(all.filter(function (id) { return dockDef.indexOf(id) < 0; }), ORDER.g).filter(function (id) { return d.indexOf(id) < 0; });
    all.forEach(function (id) { if (d.indexOf(id) < 0 && g.indexOf(id) < 0) g.push(id); });
    if (d.indexOf("search") < 0 && g.indexOf("search") < 0) d.unshift("search");
    return { g: g, d: d };
  }
  function anyIcon(id, i) {
    if (id === "search") return '<button class="ico" type="button" data-id="search" data-spot="1" style="--i:' + i + '" aria-label="搜索"><span class="sq" style="--g1:#ffffff;--g2:#f1f1f4;--gc:#8e8e93"><svg viewBox="0 0 24 24">' + SEARCH_P + '</svg></span><span class="lb">搜索</span></button>';
    return iconBtn(id, i);
  }
  function grid() {
    var L = layoutIds();
    return '<div class="igrid">' + L.g.map(function (id, i) { return anyIcon(id, i); }).join("") + "</div>";
  }
  function dock() {
    var L = layoutIds();
    return '<div class="dock">' + L.d.map(function (id, i) { return anyIcon(id, 14 + i); }).join("") + "</div>";
  }

  function buildHome() {
    if (mobile) {
      homeL.innerHTML = "";
      homeR.innerHTML = statusBar("M") + widgets() + searchPill() + grid() + dock();
    } else {
      homeL.innerHTML = statusBar("L") + widgets();
      homeR.innerHTML = statusBar("R") + searchPill() + grid() + dock();
    }
    if (body.classList.contains("ready")) runCounters();
  }
  function buildLock() {
    var sub = mobile ? "轻点进入" : "轻点展开";
    lock.innerHTML = lockM.innerHTML = '<div class="ld">' + dateStr() + '</div><div class="lt clk">' + nowStr() + '</div><div class="ln2">蒸汽会员专属资源库</div><div class="ln3">STEAM MEMBERS</div>' +
      '<div class="notif"><span class="ni"><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></span><div><b>欢迎加入蒸汽会员</b><span>资源库已更新 · ' + esc(S.updated || "") + "</span></div></div>" +
      '<div class="unlock"><span class="arr"><svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg></span>' + sub + "</div>";
  }
  function tickClock() {
    document.querySelectorAll(".clk").forEach(function (n) { n.textContent = nowStr(); });
    var d = $("wDate"); if (d) d.textContent = dateStr();
  }
  setInterval(tickClock, 10000);

  function runCounters() {
    document.querySelectorAll("[data-count]").forEach(function (el, i) {
      var to = +el.getAttribute("data-count");
      if (reduce) { el.textContent = to; return; }
      var t0 = performance.now() + 300 + i * 120, dur = 1300;
      (function tick(t) {
        var p = Math.max(0, Math.min(1, (t - t0) / dur)), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
    });
  }

  /* ---------------- 尺寸与模式 ---------------- */
  function layout() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var m = vw < 760;
    if (m) {
      root.style.setProperty("--H", vh + "px");
      root.style.setProperty("--W", vw + "px");
    } else {
      var H = Math.max(400, Math.min(vh * 0.8, 800, (vw * 0.92) / 1.5));
      root.style.setProperty("--H", H + "px");
      root.style.setProperty("--W", H * 1.5 + "px");
    }
    if (m !== mobile) {
      mobile = m;
      body.classList.toggle("m", m);
      buildHome(); buildLock();
    }
  }
  window.addEventListener("resize", layout);

  /* ---------------- 大字拉伸背景 ---------------- */
  (function () {
    var st = $("stretch"), unit = "STEAM · 蒸汽 · ", rep = "";
    for (var k = 0; k < 7; k++) rep += unit;
    st.innerHTML = [[0.9, 0.12], [1, 0.22], [1.12, 0.3], [1, 0.22], [0.9, 0.12]].map(function (l) {
      return '<div class="ln" style="--b:' + l[0] + ";--k:" + l[1] + '"><span>' + rep + rep + "</span></div>";
    }).join("");
    if (!reduce) window.addEventListener("pointermove", rafThrottle(function (e) { st.style.setProperty("--mx", (e.clientX / window.innerWidth).toFixed(2)); }), { passive: true });
  })();

  /* ---------------- 展开动画 ---------------- */
  var unfolded = false, autoT;
  function unfold() {
    if (unfolded) return;
    unfolded = true; clearTimeout(autoT);
    foldToken++;
    body.classList.remove("intro", "folding");
    body.classList.add("unfolding");
    device.classList.remove("folded");
    lockM.classList.add("gone");
    hint.style.opacity = 0;
    var wait = reduce ? 0 : (mobile ? 900 : 1250);
    setTimeout(function () {
      body.classList.add("ready");
      runCounters();
      setHint();
      hint.style.opacity = 1;
    }, wait);
    setTimeout(function () {
      device.classList.add("tilt");
      body.classList.add("settled");
      var id = routeId(); if (id) openApp(id, { push: false });
    }, wait + (reduce ? 0 : 700));
  }
  [lock, lockM].forEach(function (l) {
    l.addEventListener("click", unfold);
    l.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); unfold(); } });
  });
  device.addEventListener("click", function () { if (!unfolded) unfold(); });

  /* 设备随指针轻微转动（展开后，仅桌面） */
  var tiltOn = true;
  if (finePointer && !reduce) {
    window.addEventListener("pointermove", rafThrottle(function (e) {
      if (!unfolded || mobile || !device.classList.contains("tilt") || (drag && drag.started)) return;
      if (!app.hidden || !spot.hidden) { device.style.transform = ""; return; }
      var x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
      device.style.transform = "rotateY(" + (x * 4).toFixed(2) + "deg) rotateX(" + (-y * 3).toFixed(2) + "deg)";
    }), { passive: true });
  }

  /* ---------------- 打开 / 关闭应用 ---------------- */
  var current = null, opening = false;
  function routeId() { var m = location.hash.match(/^#\/([\w-]+)/); return m && SEC[m[1]] ? m[1] : null; }
  function originIcon(id) {
    var list = document.querySelectorAll('.ico[data-open="' + id + '"]');
    for (var i = 0; i < list.length; i++) if (list[i].offsetParent) return list[i];
    return document.querySelector('.ico[data-spot]');
  }
  function morph(el, from, to, opts) {
    return el.animate([from, to], opts).finished.catch(function () {});
  }
  function z3() { return body.classList.contains("settled") ? "translateZ(0)" : "translateZ(calc(var(--th) * .5 + 4px))"; }
  function iconFrame(icon) {
    var a = app.getBoundingClientRect(), r = (icon.querySelector(".sq") || icon).getBoundingClientRect();
    return z3() + " translate(" + (r.left - a.left) + "px," + (r.top - a.top) + "px) scale(" + (r.width / a.width) + "," + (r.height / a.height) + ")";
  }

  function openApp(id, opt) {
    opt = opt || {};
    var sec = SEC[id]; if (!sec || opening) return;
    if (!spot.hidden) closeSpot(true);
    if (current === id && !app.hidden) { if (opt.item != null) focusItem(id, opt.item); return; }
    opening = true;
    current = id;
    device.style.transform = "";
    app.setAttribute("style", gvars(sec));
    appTitle.innerHTML = '<span class="mini">' + glyph(sec) + "</span><span>" + esc(sec.title) + "</span>";
    appBody.innerHTML = renderSection(sec);
    appBody.scrollTop = 0;
    app.classList.remove("show");
    app.hidden = false;
    appBody.scrollTop = 0;
    clampCards();
    body.classList.add("app-open");
    var icon = originIcon(id);
    if (opt.push !== false) history.pushState({ app: id }, "", "#/" + id);
    var done = function () {
      opening = false;
      app.classList.add("show");
      if (opt.item != null) focusItem(id, opt.item); else { appBody.scrollTop = 0; $("appBack").focus({ preventScroll: true }); }
    };
    if (reduce || !icon) { done(); return; }
    icon.classList.add("opening");
    var opts = { duration: 560, easing: "cubic-bezier(.32,.72,0,1)" };
    appBg.animate([{ opacity: 1 }, { opacity: 1, offset: 0.45 }, { opacity: 0 }], opts);
    morph(app, { transform: iconFrame(icon), borderRadius: "40%" }, { transform: z3(), borderRadius: mobile ? "0px" : "2em" }, opts).then(function () {
      icon.classList.remove("opening"); done();
    });
  }

  function closeApp(opt) {
    opt = opt || {};
    if (app.hidden || opening) return;
    var id = current, icon = originIcon(id);
    var finish = function () {
      closeReader(true);
      app.hidden = true; app.classList.remove("show"); appBody.innerHTML = ""; appBody.scrollTop = 0; current = null; opening = false; body.classList.remove("app-open");
      if (icon) { icon.classList.remove("opening"); icon.focus({ preventScroll: true }); }
    };
    if (opt.pop !== true && history.state && history.state.app) { history.back(); return; }
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    if (reduce || !icon) { finish(); return; }
    opening = true;
    icon.classList.add("opening");
    var opts = { duration: 460, easing: "cubic-bezier(.32,.72,0,1)" };
    appBg.animate([{ opacity: 0 }, { opacity: 1, offset: 0.4 }, { opacity: 1 }], opts);
    morph(app, { transform: z3(), borderRadius: mobile ? "0px" : "2em" }, { transform: iconFrame(icon), borderRadius: "40%" }, opts).then(finish);
  }

  window.addEventListener("popstate", function () {
    var id = routeId();
    if (id) openApp(id, { push: false });
    else if (!app.hidden) closeApp({ pop: true });
  });

  function focusItem(id, i) {
    var el = appBody.querySelector('[data-k="' + id + "-" + i + '"]'); if (!el) return;
    if (el.tagName === "DETAILS") el.open = true;
    el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    if (el.classList.contains("clamp")) setTimeout(function () { openReader(el); }, reduce ? 0 : 380);
  }

  /* ---------------- 长卡片：只显示固定高度，点开后在悬浮窗里看全文 ---------------- */
  function clampCards() {
    var lim = mobile ? 340 : 300;
    appBody.querySelectorAll(".card.item").forEach(function (c) {
      var links = null, kids = Array.prototype.slice.call(c.children);
      var wrap = document.createElement("div"); wrap.className = "cbody";
      kids.forEach(function (k) { if (k.classList.contains("links")) links = k; else wrap.appendChild(k); });
      c.insertBefore(wrap, links);
      var max = c.classList.contains("wide") ? lim + 160 : lim;
      if (wrap.scrollHeight > max + 80) {
        c.classList.add("clamp"); c.style.setProperty("--ch", max + "px");
        var b = document.createElement("button"); b.type = "button"; b.className = "more"; b.textContent = "查看全部";
        c.insertBefore(b, links);
      }
    });
  }
  var reader = document.createElement("div");
  reader.className = "reader"; reader.hidden = true;
  reader.innerHTML = '<div class="rd-mask"></div><div class="rd-panel" role="dialog" aria-modal="true" aria-label="查看全文">' +
    '<nav class="rd-nav" aria-label="本板块目录"><div class="rd-nav-h">本板块目录</div><ol></ol></nav>' +
    '<div class="rd-main"><div class="rd-head"><button class="rd-ib rd-toc" type="button">目录</button><span class="rd-pos"></span>' +
    '<button class="rd-ib rd-prev" type="button" aria-label="上一条">↑<span> 上一条</span></button><button class="rd-ib rd-next" type="button" aria-label="下一条">↓<span> 下一条</span></button>' +
    '<button class="rd-ib rd-x" type="button" aria-label="关闭">关闭</button></div><div class="rd-body"></div></div></div>';
  app.appendChild(reader);
  var rdNav = reader.querySelector(".rd-nav"), rdList = reader.querySelector("ol"), rdBody = reader.querySelector(".rd-body"), rdPos = reader.querySelector(".rd-pos");
  var rdPrev = reader.querySelector(".rd-prev"), rdNext = reader.querySelector(".rd-next");
  var rdKeys = [], rdAt = -1, rdBack = null, rdTimer = 0;
  function keyIdx(k) { return +k.slice(k.lastIndexOf("-") + 1); }
  function openReader(el) {
    var sec = SEC[current]; if (!sec || !el) return;
    var els = Array.prototype.filter.call(appBody.querySelectorAll(".card.item"), function (x) { return !x.classList.contains("off"); });
    rdKeys = els.map(function (x) { return x.getAttribute("data-k"); });
    rdList.innerHTML = rdKeys.map(function (k, n) {
      var it = sec.items[keyIdx(k)], t = it.title || it.t || it.name || it.term || it.w || "", sub = it.meta || it.tag || "";
      return '<li><button type="button" data-n="' + n + '">' + esc(t) + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</button></li>";
    }).join("");
    clearTimeout(rdTimer);
    rdBack = document.activeElement;
    reader.hidden = false; reader.classList.remove("toc");
    requestAnimationFrame(function () { requestAnimationFrame(function () { reader.classList.add("show"); }); });
    rdShow(Math.max(0, rdKeys.indexOf(el.getAttribute("data-k"))));
    reader.querySelector(".rd-x").focus({ preventScroll: true });
  }
  function rdShow(n) {
    if (n < 0 || n >= rdKeys.length) return;
    rdAt = n;
    var sec = SEC[current], i = keyIdx(rdKeys[n]), it = sec.items[i];
    var r = (R[sec.type] || R.cards)(it, i, sec);
    rdBody.innerHTML = '<div class="card rd-card' + (it.slot ? " slot" : "") + '">' + r.html + "</div>";
    rdBody.scrollTop = 0;
    rdPos.textContent = (n + 1) + " / " + rdKeys.length;
    rdPrev.disabled = n === 0; rdNext.disabled = n === rdKeys.length - 1;
    reader.classList.remove("toc");
    Array.prototype.forEach.call(rdList.querySelectorAll("button"), function (b, m) {
      b.classList.toggle("on", m === n);
      if (m === n && (b.offsetTop < rdNav.scrollTop || b.offsetTop + b.offsetHeight > rdNav.scrollTop + rdNav.clientHeight)) rdNav.scrollTop = b.offsetTop - rdNav.clientHeight / 3;
    });
  }
  function closeReader(instant) {
    if (reader.hidden) return;
    reader.classList.remove("show", "toc");
    var done = function () { reader.hidden = true; rdBody.innerHTML = ""; };
    if (instant === true || reduce) done(); else rdTimer = setTimeout(done, 320);
    if (instant !== true && rdBack && rdBack.focus) rdBack.focus({ preventScroll: true });
  }
  reader.addEventListener("click", function (e) {
    if (e.target.classList.contains("rd-mask") || e.target.closest(".rd-x")) { closeReader(); return; }
    if (e.target.closest(".rd-prev")) { rdShow(rdAt - 1); return; }
    if (e.target.closest(".rd-next")) { rdShow(rdAt + 1); return; }
    if (e.target.closest(".rd-toc")) { reader.classList.toggle("toc"); return; }
    var nb = e.target.closest("[data-n]"); if (nb) rdShow(+nb.getAttribute("data-n"));
  });
  /* 手机上左右滑动切换上一条 / 下一条 */
  var rdTouch = null;
  rdBody.addEventListener("touchstart", function (e) { var t = e.touches[0]; rdTouch = { x: t.clientX, y: t.clientY }; }, { passive: true });
  rdBody.addEventListener("touchend", function (e) {
    if (!rdTouch) return; var t = e.changedTouches[0], dx = t.clientX - rdTouch.x, dy = t.clientY - rdTouch.y; rdTouch = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) rdShow(rdAt + (dx < 0 ? 1 : -1));
  }, { passive: true });

  $("appBack").addEventListener("click", function () { closeApp(); });
  $("hbar").addEventListener("click", function () { closeApp(); });
  $("appSearch").addEventListener("click", function () { openSpot(); });

  /* ---------------- 全局搜索 ---------------- */
  function openSpot() {
    if (!unfolded) unfold();
    spot.hidden = false;
    requestAnimationFrame(function () { spot.classList.add("show"); });
    spotQ.value = ""; renderResults("");
    setTimeout(function () { spotQ.focus(); }, 60);
  }
  function closeSpot(instant) {
    spot.classList.remove("show");
    if (instant) spot.hidden = true; else setTimeout(function () { spot.hidden = true; }, 250);
  }
  function renderResults(q) {
    q = q.trim().toLowerCase();
    var list;
    if (!q) {
      list = S.sections.map(function (s) { return { sec: s, i: null, title: s.title, sub: s.intro }; });
    } else {
      list = INDEX.filter(function (x) { return x.all.indexOf(q) > -1 || x.sec.title.toLowerCase().indexOf(q) > -1; }).slice(0, 40);
    }
    if (!list.length) { spotRes.innerHTML = '<div class="spot-empty">没有找到相关内容，换个关键词试试</div>'; return; }
    spotRes.innerHTML = (!q ? '<div class="sr-tools"><button class="sr-reset" type="button" data-lock="1">' + (LOCKED ? "解除图标锁定" : "锁定图标排列") + "</button>" + (hasCustom() ? '<button class="sr-reset" type="button" data-reset="1">恢复默认图标排列</button>' : "") + "</div>" : "") + list.map(function (x, n) {
      return '<button class="sr" type="button" data-open="' + x.sec.id + '"' + (x.i != null ? ' data-item="' + x.i + '"' : "") + ' style="animation-delay:' + Math.min(n, 12) * 18 + 'ms"><span class="mini" style="' + gvars(x.sec) + '">' + glyph(x.sec) +
        "</span><div><b>" + esc(x.title) + "</b><small>" + esc(x.i != null ? x.sec.title + " · " + x.sub : x.sub) + "</small></div></button>";
    }).join("");
  }
  spotQ.addEventListener("input", function () { renderResults(spotQ.value); });
  spotQ.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { var f = spotRes.querySelector(".sr"); if (f) f.click(); }
  });
  $("spotX").addEventListener("click", function () { closeSpot(); });
  spot.addEventListener("click", function (e) { if (e.target === spot) closeSpot(); });

  /* ---------------- 统一点击委托 ---------------- */
  device.addEventListener("click", function (e) {
    if (!unfolded) return;
    var s = e.target.closest("[data-spot]");
    if (s) { e.stopPropagation(); openSpot(); return; }
    var o = e.target.closest("[data-open]");
    if (o) {
      var item = o.getAttribute("data-item");
      var fromSpot = o.classList.contains("sr");
      if (fromSpot && current === o.getAttribute("data-open") && !app.hidden) { closeSpot(); focusItem(current, +item); return; }
      openApp(o.getAttribute("data-open"), { item: item == null ? null : +item });
      return;
    }
    var c = e.target.closest(".btn.copy");
    if (c) { var pre = c.parentNode.querySelector("pre"); if (pre) copy(pre.textContent); return; }
    var mo = e.target.closest(".more");
    if (mo && appBody.contains(mo)) { openReader(mo.closest(".item")); return; }
    var cb = e.target.closest(".clamp > .cbody");
    if (cb && appBody.contains(cb) && !e.target.closest("a,button,input,summary,pre")) { openReader(cb.closest(".item")); return; }
    var ch = e.target.closest(".chip[data-f]");
    if (ch) {
      var box = ch.closest(".wrap"), f = ch.getAttribute("data-f");
      box.querySelectorAll(".chip").forEach(function (x) { x.classList.toggle("on", x === ch); });
      box.querySelectorAll(".item").forEach(function (x) { x.classList.toggle("off", !!f && x.getAttribute("data-tag") !== f); });
    }
  });

  document.addEventListener("keydown", function (e) {
    var typing = /INPUT|TEXTAREA/.test(document.activeElement && document.activeElement.tagName);
    if (!reader.hidden) {
      if (e.key === "Escape") { e.preventDefault(); closeReader(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); rdShow(rdAt - 1); }
      else if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); rdShow(rdAt + 1); }
      return;
    }
    if (e.key === "/" && !typing) { e.preventDefault(); openSpot(); }
    else if (e.key === "Escape") {
      if (!spot.hidden) closeSpot(); else if (!app.hidden) closeApp();
    } else if (!unfolded && (e.key === "Enter" || e.key === " ")) { unfold(); }
  });

  /* ---------------- 提示条 + 恢复默认 ---------------- */
  function setHint() {
    hint.innerHTML = (LOCKED ? "点击图标进入 · 图标排列已锁定 · " : "点击图标进入 · 拖动图标可调整位置 · ") + "左屏空白处向右拖动可合上手机 · 按 / 搜索" +
      ' · <button type="button" data-lock="1">' + (LOCKED ? "解除锁定" : "锁定排列") + "</button>" +
      (hasCustom() ? ' · <button type="button" data-reset="1">恢复默认排列</button>' : "");
  }
  function resetOrder() {
    clearOrder(); buildHome(); setHint();
    if (!spot.hidden) renderResults(spotQ.value);
    toast("已恢复默认排列");
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-reset]")) { e.preventDefault(); e.stopPropagation(); resetOrder(); }
    else if (e.target.closest("[data-lock]")) {
      e.preventDefault(); e.stopPropagation();
      setLock(!LOCKED); setHint();
      if (!spot.hidden) renderResults(spotQ.value);
      toast(LOCKED ? "已锁定图标排列，不会被误拖动" : "已解除锁定，可以拖动调整");
    }
  }, true);

  /* 入场动画结束后解除，让悬停/拖动的位移生效 */
  device.addEventListener("animationend", function (e) {
    if (/^(pop|wgIn)$/.test(e.animationName) && e.target.matches(".ico,.wg")) e.target.classList.add("popped");
  });

  /* ---------------- 悬停动效：图标 3D 倾斜 + 扫光、小组件倾斜 + 高光、底栏放大 ---------------- */
  if (finePointer && !reduce) {
    var lastSq = null, lastWg = null, dockOn = false;
    device.addEventListener("pointermove", rafThrottle(function (e) {
      if (drag && drag.started) return;
      var sq = e.target.closest(".ico") ? e.target.closest(".ico").querySelector(".sq") : null;
      if (lastSq && lastSq !== sq) { lastSq.style.removeProperty("--rx"); lastSq.style.removeProperty("--ry"); }
      if (sq && !e.target.closest(".ghost")) {
        var r = sq.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        sq.style.setProperty("--rx", ((0.5 - py) * 22).toFixed(1) + "deg");
        sq.style.setProperty("--ry", ((px - 0.5) * 22).toFixed(1) + "deg");
      }
      lastSq = sq;
      var wg = e.target.closest(".wg");
      if (lastWg && lastWg !== wg) { ["--rx", "--ry"].forEach(function (k) { lastWg.style.removeProperty(k); }); }
      if (wg) {
        var w = wg.getBoundingClientRect(), wx = (e.clientX - w.left) / w.width, wy = (e.clientY - w.top) / w.height;
        wg.style.setProperty("--rx", ((0.5 - wy) * 7).toFixed(2) + "deg");
        wg.style.setProperty("--ry", ((wx - 0.5) * 7).toFixed(2) + "deg");
        wg.style.setProperty("--gx", (wx * 100).toFixed(1) + "%");
        wg.style.setProperty("--gy", (wy * 100).toFixed(1) + "%");
      }
      lastWg = wg;
      /* 底栏放大 */
      var dk = e.target.closest(".dock");
      if (!dk && !dockOn) return;
      dockOn = !!dk;
      document.querySelectorAll(".dock .sq").forEach(function (q) {
        if (!dk) { q.style.removeProperty("--ds"); return; }
        var b = q.getBoundingClientRect(), c = b.left + b.width / 2, d = Math.abs(e.clientX - c);
        var k = Math.max(0, 1 - d / (b.width * 2.6));
        q.style.setProperty("--ds", (1 + 0.3 * k * k).toFixed(3));
      });
    }));
    device.addEventListener("pointerleave", function () {
      document.querySelectorAll(".dock .sq").forEach(function (q) { q.style.removeProperty("--ds"); });
    });
  }

  /* ---------------- 拖动排序（鼠标：按住拖动；触屏：长按后拖动） ---------------- */
  var drag = null, suppressClick = false;
  function homeItems() { return Array.prototype.slice.call(device.querySelectorAll("#homeL .ico, #homeR .ico, #homeL .wg, #homeR .wg")); }
  function flip(mutate) {
    var els = homeItems(), before = new Map();
    els.forEach(function (el) { before.set(el, el.getBoundingClientRect()); });
    mutate();
    els.forEach(function (el) {
      var a = before.get(el), b = el.getBoundingClientRect();
      var dx = a.left - b.left, dy = a.top - b.top;
      if (!dx && !dy) return;
      el.style.transition = "none";
      el.style.transform = "translate(" + dx + "px," + dy + "px)";
      void el.offsetWidth;
      el.style.transition = "transform .42s cubic-bezier(.34,1.4,.64,1)";
      el.style.transform = "";
      setTimeout(function () { el.style.transition = ""; }, 450);
    });
  }
  function startDrag() {
    if (LOCKED) { drag = null; toast("图标排列已锁定，可在底部提示或搜索里解除锁定"); return false; }
    var el = drag.el, r = el.getBoundingClientRect();
    drag.started = true;
    device.style.transform = "";
    var g = el.cloneNode(true);
    g.querySelectorAll("[id]").forEach(function (n) { n.removeAttribute("id"); });
    g.classList.add("ghost", "popped");
    g.style.cssText += ";left:" + r.left + "px;top:" + r.top + "px;width:" + r.width + "px;height:" + r.height + "px;font-size:" + getComputedStyle(device).fontSize;
    document.body.appendChild(g);
    drag.ghost = g; drag.ox = drag.x - r.left; drag.oy = drag.y - r.top;
    requestAnimationFrame(function () { g.classList.add("lift"); });
    el.classList.add("placeholder");
    body.classList.add("editing");
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (err) {} }
  }
  function capacityOk(target, el) {
    if (!target.classList.contains("dock") || el.parentNode === target) return true;
    return target.querySelectorAll(".ico").length < 5;
  }
  function reorderAt(x, y) {
    var t = document.elementFromPoint(x, y); if (!t) return;
    var el = drag.el;
    if (drag.kind === "ico") {
      var over = t.closest(".ico"), box = t.closest(".igrid, .dock");
      if (over && (over === el || !over.closest("#homeL, #homeR"))) over = null;
      if (over === drag.lastOver) return;
      drag.lastOver = over;
      if (over) {
        var parent = over.parentNode;
        if (!capacityOk(parent, el)) return;
        var sib = Array.prototype.slice.call(parent.children);
        var after = parent === el.parentNode ? sib.indexOf(el) < sib.indexOf(over) : (x > over.getBoundingClientRect().left + over.offsetWidth / 2);
        flip(function () { parent.insertBefore(el, after ? over.nextSibling : over); });
      } else if (box && box !== el.parentNode && capacityOk(box, el)) {
        flip(function () { box.appendChild(el); });
      }
    } else {
      var ow = t.closest(".wg");
      if (ow && (ow === el || ow.parentNode !== el.parentNode)) ow = null;
      if (ow === drag.lastOver) return;
      drag.lastOver = ow;
      if (ow) {
        var p = ow.parentNode, list = Array.prototype.slice.call(p.children);
        var aft = list.indexOf(el) < list.indexOf(ow);
        flip(function () { p.insertBefore(el, aft ? ow.nextSibling : ow); });
      }
    }
  }
  function persist() {
    var ids = function (sel) { return Array.prototype.map.call(device.querySelectorAll(sel), function (n) { return n.getAttribute("data-id") || n.getAttribute("data-w"); }); };
    saveOrder({ g: ids(".igrid .ico"), d: ids(".dock .ico"), w: ids(".wgrid .wg") });
  }
  function endDrag(cancel) {
    if (!drag) return;
    clearTimeout(drag.timer);
    var d = drag; drag = null;
    if (!d.started) return;
    suppressClick = true; setTimeout(function () { suppressClick = false; }, 60);
    device.querySelectorAll(".sq").forEach(function (q) { ["--ds", "--rx", "--ry"].forEach(function (k) { q.style.removeProperty(k); }); });
    var r = d.el.getBoundingClientRect(), g = d.ghost;
    g.classList.remove("lift"); g.classList.add("drop");
    g.style.left = r.left + "px"; g.style.top = r.top + "px";
    setTimeout(function () {
      g.remove(); d.el.classList.remove("placeholder");
      if (!document.querySelector(".ghost")) body.classList.remove("editing");
    }, 320);
    persist(); setHint();
    if (!cancel) toast("已保存新的排列，下次打开也会保持");
  }
  device.addEventListener("pointerdown", function (e) {
    if (!body.classList.contains("ready") || !app.hidden || !spot.hidden || drag) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    var el = e.target.closest(".ico, .wg");
    if (!el || !el.closest("#homeL, #homeR")) return;
    drag = { el: el, kind: el.classList.contains("wg") ? "wg" : "ico", x: e.clientX, y: e.clientY, pid: e.pointerId, touch: e.pointerType !== "mouse", started: false, lastOver: null };
    if (drag.touch) drag.timer = setTimeout(function () { if (drag && !drag.started) startDrag(); }, 380);
  });
  window.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.pid) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.started) {
      if (drag.touch) { if (Math.hypot(dx, dy) > 9) { clearTimeout(drag.timer); drag = null; } return; }
      if (Math.hypot(dx, dy) < 6) return;
      if (startDrag() === false) return;
    }
    drag.ghost.style.left = (e.clientX - drag.ox) + "px";
    drag.ghost.style.top = (e.clientY - drag.oy) + "px";
    reorderAt(e.clientX, e.clientY);
  });
  window.addEventListener("pointerup", function (e) { if (drag && e.pointerId === drag.pid) endDrag(false); });
  window.addEventListener("pointercancel", function (e) { if (drag && e.pointerId === drag.pid) endDrag(true); });
  document.addEventListener("touchmove", function (e) { if (drag && drag.started) e.preventDefault(); }, { passive: false });
  device.addEventListener("contextmenu", function (e) { if (e.target.closest(".ico, .wg")) e.preventDefault(); });
  device.addEventListener("click", function (e) { if (suppressClick) { e.stopPropagation(); e.preventDefault(); suppressClick = false; } }, true);
  device.addEventListener("dragstart", function (e) { e.preventDefault(); });

  /* ---------------- 合上手机：在左屏空白处按住鼠标向右拖动（电脑） ---------------- */
  var leftHalf = device.querySelector(".half.left"), fold = null, foldToken = 0;
  homeL.addEventListener("pointerdown", function (e) {
    if (mobile || !body.classList.contains("settled") || !app.hidden || !spot.hidden || drag || fold) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest(".wg, .ico, button, a")) return;
    fold = { x: e.clientX, y: e.clientY, pid: e.pointerId, started: false, p: 0, w: homeL.getBoundingClientRect().width };
  });
  window.addEventListener("pointermove", function (e) {
    if (!fold || e.pointerId !== fold.pid) return;
    var dx = e.clientX - fold.x, dy = e.clientY - fold.y;
    if (!fold.started) {
      if (Math.hypot(dx, dy) < 8) return;
      if (dx <= 0 || Math.abs(dy) > Math.abs(dx)) { fold = null; return; }
      fold.started = true;
      body.classList.remove("settled"); body.classList.add("folding");
      device.classList.remove("tilt");
      leftHalf.style.transition = "none"; device.style.transition = "none";
    }
    /* 让左屏外侧边缘跟着鼠标走：边缘位移 = 半屏宽 × (1 − cosθ) */
    var c = Math.max(-1, Math.min(1, 1 - dx / fold.w));
    var deg = Math.acos(c) * 180 / Math.PI, p = deg / 180;
    fold.p = p;
    leftHalf.style.transform = "rotateY(" + deg.toFixed(1) + "deg) translateZ(calc((var(--th) + .12em) * " + (-p).toFixed(3) + "))";
    device.style.transform = "translateX(" + (-25 * p).toFixed(2) + "%) rotateY(" + (-14 * p).toFixed(2) + "deg) rotateX(" + (6 * p).toFixed(2) + "deg)";
  });
  function endFold() {
    if (!fold) return;
    var f = fold; fold = null;
    if (!f.started) return;
    suppressClick = true; setTimeout(function () { suppressClick = false; }, 60);
    leftHalf.style.transition = ""; device.style.transition = "";
    if (f.p > 0.35) { foldUp(); return; }
    leftHalf.style.transform = ""; device.style.transform = "";
    var tk = ++foldToken;
    setTimeout(function () {
      if (tk !== foldToken || device.classList.contains("folded")) return;
      body.classList.remove("folding"); body.classList.add("settled"); device.classList.add("tilt");
    }, 1000);
  }
  function foldUp() {
    var tk = ++foldToken;
    leftHalf.style.transform = ""; device.style.transform = "";
    device.classList.add("folded");
    device.classList.remove("tilt");
    unfolded = false;
    buildLock();
    lockM.classList.remove("gone");
    hint.textContent = "轻点手机展开";
    body.classList.add("intro");
    setTimeout(function () {
      if (tk !== foldToken || !device.classList.contains("folded")) return;
      body.classList.remove("ready", "unfolding", "folding", "settled");
      buildHome();
    }, 1700);
  }
  window.addEventListener("pointerup", function (e) { if (fold && e.pointerId === fold.pid) endFold(); });
  window.addEventListener("pointercancel", function (e) { if (fold && e.pointerId === fold.pid) endFold(); });

  /* ---------------- 卡片倾斜 / 按钮涟漪 / 复制 ---------------- */
  if (finePointer && !reduce) {
    appBody.addEventListener("pointermove", function (e) {
      var c = e.target.closest(".card"); if (!c) return;
      var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.classList.add("tilting");
      c.style.setProperty("--ry", ((px - 0.5) * 7).toFixed(2) + "deg");
      c.style.setProperty("--rx", ((0.5 - py) * 7).toFixed(2) + "deg");
      c.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
      c.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
    });
    appBody.addEventListener("pointerout", function (e) {
      var c = e.target.closest(".card"); if (!c || c.contains(e.relatedTarget)) return;
      c.classList.remove("tilting"); c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg");
    });
  }
  document.addEventListener("pointerdown", function (e) {
    var b = e.target.closest(".btn"); if (!b || reduce || b.getAttribute("aria-disabled")) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement("span");
    s.className = "ripple";
    s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (e.clientX - r.left - d / 2) + "px;top:" + (e.clientY - r.top - d / 2) + "px";
    b.appendChild(s); setTimeout(function () { s.remove(); }, 700);
  });
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.classList.remove("show"); }, 1400);
  }
  function copy(text) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = 0;
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("已复制"); } catch (err) { toast("复制失败，请手动选择"); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast("已复制"); }, fallback);
    else fallback();
  }

  /* ---------------- 机身厚度：在每半边正反面之间叠放金属切片 ---------------- */
  (function () {
    var N = 24;
    device.querySelectorAll(".half").forEach(function (half) {
      var frag = document.createDocumentFragment();
      for (var k = 0; k < N; k++) {
        var f = -0.5 + (k + 0.5) / N;                 /* 在厚度中的位置：-0.5 ~ 0.5 */
        var l = 72 + 18 * Math.sin(Math.PI * (k + 0.5) / N); /* 中间亮、两侧暗，像圆润的金属边 */
        var d = document.createElement("i");
        d.className = "slab";
        d.style.transform = "translateZ(calc(var(--th) * " + f.toFixed(3) + "))";
        d.style.background = "linear-gradient(160deg,hsl(215 6% " + (l + 5) + "%),hsl(215 5% " + (l - 3) + "%))";
        frag.appendChild(d);
      }
      half.insertBefore(frag, half.firstChild);
    });
  })();

  /* ---------------- 启动 ---------------- */
  layout();
  requestAnimationFrame(function () { requestAnimationFrame(function () { body.classList.remove("preload"); }); });
  if (reduce) unfold();
  else autoT = setTimeout(unfold, routeId() ? 600 : 1800);
})();
