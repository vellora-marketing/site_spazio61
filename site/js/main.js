/* ==========================================================================
   main.js · Spazio 61 (demonstração)
   Movimento com GSAP 3.15 + ScrollTrigger + Lenis 1.3.26, hospedados em js/vendor/.
   CSP estrita: nada de style="" em HTML injetado; posições e cores via CSSOM (element.style).
   Sem rede, sem cookies, sem armazenamento no navegador.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SPAZIO_CONFIG || {};
  var root = document.documentElement;
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var REDUCE_Q = "(prefers-reduced-motion: reduce)";
  var motionOff = function () { return window.matchMedia(REDUCE_Q).matches; };
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  var LenisLib = window.Lenis;
  var hasMotion = !!(gsap && ST);
  var remPx = function () { return parseFloat(getComputedStyle(root).fontSize) / 16; };
  var mk = function (tag, cls) { var el = document.createElement(tag); if (cls) el.className = cls; return el; };
  var SETA = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13L13 3M13 11V3H5"/></svg>';

  /* Grid Kelder: fl(xl, lg, md, base) = um px de desenho do quadro ativo. */
  var fl = function (xl, lg, md, base) {
    return "calc(" + base + " * var(--raw-w390) + " + md + " * var(--raw-w768) + " + lg + " * var(--raw-w1024) + " + xl + " * var(--raw-w1440))";
  };
  var frame = function () {
    var w = root.clientWidth;
    return w <= 560 ? "base" : w <= 768 ? "md" : w <= 1024 ? "lg" : "xl";
  };

  /* Durações: 20 % menores até 1024 ou no toque. */
  var EASE_ENTER = "spazioEnter", EASE_SCROLL = "spazioScroll";
  var duration = function (ms, touch) {
    return (ms / 1000) * (touch || window.matchMedia("(width <= 1024px)").matches ? 0.8 : 1);
  };
  var bezier = function (x1, y1, x2, y2) {
    var sample = function (t, a, b) { return 3 * a * t * Math.pow(1 - t, 2) + 3 * b * t * t * (1 - t) + t * t * t; };
    return function (x) {
      var lo = 0, hi = 1;
      for (var i = 0; i < 24; i++) { var mid = (lo + hi) / 2; if (sample(mid, x1, x2) < x) lo = mid; else hi = mid; }
      return sample((lo + hi) / 2, y1, y2);
    };
  };
  var MEDIA = {
    all: "all",
    reduced: REDUCE_Q,
    touch: "(hover: none), (pointer: coarse)",
    wide: "(min-width: 1025px)",
    low: "(max-height: 559px)"
  };
  var useGsap = function (scope, setup) {
    var mm = gsap.matchMedia(scope);
    mm.add(MEDIA, function (context) { return setup(context.conditions); });
    return mm;
  };
  if (hasMotion) {
    gsap.registerPlugin(ST);
    // O ScrollTrigger mantém um laço de requestAnimationFrame enquanto está ativo.
    // Com movimento reduzido não há pin nem scrub: ele fica desligado e nada roda com a página parada.
    var mqReduce = window.matchMedia(REDUCE_Q);
    if (mqReduce.matches) ST.disable();
    var onReduceChange = function () { if (mqReduce.matches) ST.disable(); else { ST.enable(); ST.refresh(); } };
    if (mqReduce.addEventListener) mqReduce.addEventListener("change", onReduceChange);
    gsap.registerEase(EASE_ENTER, bezier(0.22, 1, 0.36, 1));
    gsap.registerEase(EASE_SCROLL, bezier(0.65, 0, 0.35, 1));
  }

  /* ------------------------------------------------------------------------
     Lenis (scroll suave, lerp 0.1). Desligado com movimento reduzido.
     Âncoras: tratadas aqui (deslizam com o Lenis e levam o foco ao destino).
     ------------------------------------------------------------------------ */
  var lenis = null;
  if (hasMotion && LenisLib && !motionOff()) {
    lenis = new LenisLib({ smoothWheel: true, lerp: 0.1, anchors: false });
    lenis.on("scroll", ST.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  var scrollLock = function (locked) {
    if (locked) { if (lenis) lenis.stop(); root.classList.add("travado"); root.style.overflow = "hidden"; }
    else { if (lenis) lenis.start(); root.classList.remove("travado"); root.style.removeProperty("overflow"); }
  };
  var focusTarget = function (target) {
    if (!target) return;
    if (!target.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  document.addEventListener("click", function (event) {
    var link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
    if (!link || event.defaultPrevented) return;
    var id = link.getAttribute("href").slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: 0, onComplete: function () { focusTarget(target); } });
    else target.scrollIntoView({ behavior: "auto", block: "start" });
    focusTarget(target);
  });

  /* ------------------------------------------------------------------------
     Cabeçalho: sobre o topo, claro sobre a scrim; depois, sólido com linha.
     Some ao rolar para baixo e volta ao rolar para cima (ou ao receber foco).
     ------------------------------------------------------------------------ */
  var header = $("[data-site-header]");
  var heroEl = $("[data-bleed]");
  (function headerShell() {
    if (!header) return;
    var last = window.scrollY;
    var check = function () {
      var y = window.scrollY;
      // Sobre o topo enquanto ele ainda ocupa boa parte da tela; depois disso os módulos claros
      // já cobriram o fundo, e o cabeçalho fica sólido.
      var over = heroEl ? heroEl.getBoundingClientRect().bottom > header.offsetHeight + window.innerHeight * 0.45 : y <= 0;
      header.toggleAttribute("data-solid", !over);
      if (over || root.classList.contains("travado")) header.classList.remove("hd-oculto");
      else if (Math.abs(y - last) > 2) header.classList.toggle("hd-oculto", y > last);
      if (Math.abs(y - last) > 2) last = y;
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    header.addEventListener("focusin", function () { header.classList.remove("hd-oculto"); });
  })();

  /* ------------------------------------------------------------------------
     Botão "plate": no hover (desktop), placa e seta trocam de lugar.
     ------------------------------------------------------------------------ */
  var measurePlates = function () {
    $$(".plate-full").forEach(function (p) {
      var body = $(".plate-corpo", p);
      if (!body) return;
      p.style.setProperty("--plate-swap", -(body.offsetWidth + 4 * remPx()) + "px");
    });
  };
  measurePlates();
  window.addEventListener("resize", measurePlates);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measurePlates);

  /* ------------------------------------------------------------------------
     Topo: faixa de módulos (página, vidro e o módulo do WhatsApp), por quadro.
     k = módulo, r = linha a partir do topo da faixa, w = largura, h = altura.
     ------------------------------------------------------------------------ */
  var COLS = { base: 4, md: 8, lg: 12, xl: 12 };
  var STRIPS = {
    base: { rows: 3, tiles: [
      { k: 0, r: 0, w: 2, kind: "page", fato: 0 }, { k: 3, r: 0, kind: "glass" },
      { k: 0, r: 1, kind: "glass" }, { k: 1, r: 1, w: 3, kind: "page", fato: 1 },
      { k: 0, r: 2, w: 2, kind: "live" }, { k: 2, r: 2, w: 2, kind: "page", fato: 2 }
    ] },
    md: { rows: 2, tiles: [
      { k: 0, r: 0, w: 3, kind: "page", fato: 0 }, { k: 4, r: 0, kind: "glass" }, { k: 5, r: 0, w: 3, kind: "page", fato: 2 },
      { k: 0, r: 1, kind: "glass" }, { k: 1, r: 1, w: 3, kind: "page", fato: 1 }, { k: 5, r: 1, w: 3, kind: "live" }
    ] },
    lg: { rows: 2, tiles: [
      { k: 0, r: 0, w: 3, kind: "page", fato: 0 }, { k: 4, r: 0, kind: "glass" }, { k: 6, r: 0, w: 3, h: 2, kind: "live" }, { k: 11, r: 0, kind: "glass" },
      { k: 1, r: 1, kind: "glass" }, { k: 2, r: 1, w: 3, kind: "page", fato: 1 }, { k: 9, r: 1, w: 3, kind: "page", fato: 2 }
    ] },
    xl: { rows: 2, tiles: [
      { k: 2, r: 0, w: 2, kind: "page", fato: 0 }, { k: 5, r: 0, kind: "glass" }, { k: 9, r: 0, kind: "glass" }, { k: 11, r: 0, kind: "glass" },
      { k: 0, r: 1, kind: "page" }, { k: 1, r: 1, kind: "glass" }, { k: 3, r: 1, kind: "glass" },
      { k: 4, r: 1, w: 2, kind: "page", fato: 1 }, { k: 6, r: 1, w: 2, kind: "live" }, { k: 8, r: 1, kind: "glass" },
      { k: 9, r: 1, w: 2, kind: "page", fato: 2 }, { k: 11, r: 1, kind: "glass" }
    ] }
  };
  var place = function (el, row, rowSpan, k, w, n) {
    el.style.gridRow = row + " / span " + rowSpan;
    el.style.gridColumnStart = String(k === 0 ? 1 : k + 2);
    el.style.gridColumnEnd = String(k + w === n ? -1 : k + w + 2);
  };
  (function heroTiles() {
    var holder = $("[data-hero-strips]");
    if (!holder) return;
    var topo = cfg.topo || {};
    var fatos = topo.fatos || [];
    var zap = $("a[data-whatsapp]");
    Object.keys(STRIPS).forEach(function (bp) {
      var spec = STRIPS[bp], n = COLS[bp];
      var strip = mk("div", "hero-faixa tiles-" + n + " so-" + bp);
      strip.setAttribute("data-tile-strip", bp);
      strip.style.setProperty("--rows", String(spec.rows));
      spec.tiles.forEach(function (t) {
        var h = t.h || 1, w = t.w || 1, el;
        if (t.kind === "live") {
          el = mk("a", "tile tile-zap");
          el.href = zap ? zap.href : "#contato";
          el.target = "_blank";
          el.rel = "noopener noreferrer";
          var c = mk("span", "tile-conteudo");
          var rot = mk("span", "tile-rot");
          rot.appendChild(mk("span", "ponto-vivo"));
          rot.appendChild(document.createTextNode((topo.atendimento && topo.atendimento.rotulo) || "Fale com a nossa equipe"));
          var val = mk("span", "tile-val");
          val.textContent = (topo.atendimento && topo.atendimento.valor) || "WhatsApp";
          val.insertAdjacentHTML("beforeend", SETA);
          var sr = mk("span", "sr-only"); sr.textContent = " (abre em nova aba)";
          c.appendChild(rot); c.appendChild(val); c.appendChild(sr); el.appendChild(c);
          el.setAttribute("data-whatsapp", "");
        } else if (t.kind === "glass") {
          el = mk("div", "tile tile-vidro");
          el.setAttribute("aria-hidden", "true");
          el.appendChild(mk("span", "tile-luz")).setAttribute("data-tile-light", "");
        } else {
          el = mk("div", "tile tile-page");
          var f = fatos[t.fato];
          if (f) {
            var cc = mk("div", "tile-conteudo");
            var r1 = mk("span", "tile-rot"); r1.textContent = f.rotulo;
            var v1 = mk("span", "tile-val"); v1.textContent = f.valor;
            cc.appendChild(r1); cc.appendChild(v1); el.appendChild(cc);
          } else el.setAttribute("aria-hidden", "true");
        }
        el.setAttribute("data-tile-kind", t.kind);
        el.setAttribute("data-tile-row", String(spec.rows - t.r - h + 1));
        place(el, t.r + 1, h, t.k, w, n);
        strip.appendChild(el);
      });
      holder.appendChild(strip);
    });
  })();

  /* Véu de células sobre as fotos da frase. */
  $$(".veu").forEach(function (veu) {
    var n = veu.classList.contains("veu-3") ? 9 : 18;
    for (var i = 0; i < n; i++) veu.appendChild(mk("span")).setAttribute("data-photo-veil", "");
  });

  /* Linhas (card verde e faixa em marquee) a partir do config. */
  var linhas = (cfg.linhasProjetos && cfg.linhasProjetos.linhas) || [];
  (function lines() {
    var list = $("[data-linhas]");
    if (list && linhas.length) {
      list.textContent = "";
      linhas.forEach(function (l) { list.appendChild(mk("li")).textContent = l; });
    }
    var track = $("[data-track]");
    if (track && linhas.length) {
      for (var set = 0; set < 2; set++) linhas.forEach(function (l) { track.appendChild(mk("li")).textContent = l; });
    }
  })();

  /* Barra de rolagem dos cards (≤ 768). */
  (function cardsThumb() {
    var scroller = $("[data-cards]"), thumb = $("[data-scroll-thumb]");
    if (!scroller || !thumb) return;
    var raf = 0;
    var measure = function () {
      raf = 0;
      thumb.style.left = (scroller.scrollLeft / scroller.scrollWidth) * 100 + "%";
      thumb.style.width = (scroller.clientWidth / scroller.scrollWidth) * 100 + "%";
    };
    var queue = function () { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    scroller.addEventListener("scroll", queue, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(queue).observe(scroller);
  })();

  /* ------------------------------------------------------------------------
     Formulário: envio SIMULADO. Valida no navegador e mostra a mensagem.
     Não faz nenhuma requisição e não grava nada no navegador.
     ------------------------------------------------------------------------ */
  (function form() {
    var f = $("#form-contato");
    if (!f) return;
    var status = $("[data-form-status]", f);
    var rules = [
      { el: $("#f-nome", f), err: $("#e-nome", f), ok: function (v) { return v.trim().length >= 2; }, msg: "Informe o seu nome." },
      { el: $("#f-tel", f), err: $("#e-tel", f), ok: function (v) { var d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 13; }, msg: "Informe um telefone com DDD, por exemplo (61) 99999-9999." },
      { el: $("#f-email", f), err: $("#e-email", f), ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }, msg: "Informe um e-mail válido, por exemplo nome@dominio.com.br." }
    ];
    var show = function (r, bad) {
      r.el.setAttribute("aria-invalid", bad ? "true" : "false");
      r.err.hidden = !bad;
      r.err.textContent = bad ? r.msg : "";
    };
    rules.forEach(function (r) {
      r.el.addEventListener("blur", function () { if (r.el.value) show(r, !r.ok(r.el.value)); });
      r.el.addEventListener("input", function () { if (r.el.getAttribute("aria-invalid") === "true") show(r, !r.ok(r.el.value)); });
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      var first = null;
      rules.forEach(function (r) { var bad = !r.ok(r.el.value); show(r, bad); if (bad && !first) first = r.el; });
      if (first) { first.focus(); return; }
      f.reset();
      rules.forEach(function (r) { r.el.removeAttribute("aria-invalid"); });
      status.textContent = (cfg.contato && cfg.contato.sucesso) || "Recebemos o seu contato. Nesta demonstração, nada foi enviado.";
    });
  })();

  /* ------------------------------------------------------------------------
     Pré-carregamento: módulos claros somem conforme a página carrega;
     o bloco escuro conta de 0 a 100; ao terminar, começa a entrada do topo.
     ------------------------------------------------------------------------ */
  var whenLoaded = [];
  var preloaderDone = false;
  var finishPreloader = function () {
    if (preloaderDone) return;
    preloaderDone = true;
    whenLoaded.forEach(function (fn) { fn(); });
  };
  (function preloader() {
    var el = $("[data-preloader]");
    if (!el || el.hidden) { finishPreloader(); return; }
    el.setAttribute("data-done", "");
    var SQUARE_MS = 200, STAGGER_S = 0.03;
    var remove = function () { el.hidden = true; finishPreloader(); };
    if (!hasMotion) { el.classList.add("pre-saindo"); setTimeout(remove, 300); return; }
    var reduced = motionOff();
    var visible = $$("[data-preloader-strip]", el).filter(function (s) { return getComputedStyle(s).display !== "none"; })[0];
    var counts = $$("[data-preloader-count]", el);
    var squares = gsap.utils.shuffle(visible ? $$("[data-preloader-square]", visible) : []);
    var progress = function () {
      var images = Array.prototype.filter.call(document.images, function (img) { return img.loading !== "lazy"; });
      var done = images.filter(function (img) { return img.complete; }).length;
      var loaded = document.readyState === "complete" ? 1 : 0;
      var fonts = document.fonts && document.fonts.status === "loaded" ? 1 : 0;
      return (done + loaded + fonts) / (images.length + 2);
    };
    var gone = 0, shownCount = 0, ended = false;
    var end = function () {
      if (ended) return;
      ended = true;
      if (reduced) { gsap.to(el, { opacity: 0, duration: 0.2, onComplete: remove }); return; }
      var out = gsap.timeline({ onComplete: remove });
      var rest = squares.slice(gone);
      if (rest.length) out.to(rest, { opacity: 0, duration: duration(SQUARE_MS), ease: EASE_ENTER, stagger: STAGGER_S / 2 });
      out.to($$("[data-preloader-counter]", el), { opacity: 0, duration: duration(SQUARE_MS) }, rest.length ? "<" : 0);
    };
    var tick = function () {
      var gap = progress() * 100 - shownCount;
      if (gap > 0) shownCount = Math.min(100, shownCount + Math.max(1, Math.round(gap * 0.08)));
      counts.forEach(function (c) { c.textContent = String(shownCount); });
      if (!reduced) {
        var target = Math.floor((shownCount / 100) * squares.length);
        if (target > gone) {
          gsap.to(squares.slice(gone, target), { opacity: 0, duration: duration(SQUARE_MS), ease: EASE_ENTER, stagger: STAGGER_S });
          gone = target;
        }
      }
      if (shownCount >= 100) return end();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(end, 6000); // nunca prende a página
  })();

  /* ------------------------------------------------------------------------
     Menu (≤ 768): módulos escuros pousam em anéis a partir do canto do botão;
     as barras viram um módulo verde que gira e depois um X. Fechar volta, 20 % mais rápido.
     ------------------------------------------------------------------------ */
  (function siteMenu() {
    var toggle = $(".hd-menu");
    var panel = $("[data-site-menu]");
    if (!toggle || !panel) return;
    var probe = $(".menu-sonda");
    var curtain = $(".menu-cortina");
    var RING_MS = 25, ROTOR_MS = 350, ROTOR_TURN = 540, CLOSE_K = 0.8;
    var open = false, busy = false;
    var wave = { cells: [], size: 0, last: 0 };
    var closeWrap = null, closeBtn = null;
    var animated = function () { return hasMotion && !motionOff(); };

    var buildWave = function (size) {
      var cols = Math.ceil(window.innerWidth / size), rows = Math.ceil(window.innerHeight / size), cells = [];
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) cells.push({ x: x, y: y, ring: Math.max(cols - 1 - x, y) });
      return { cells: cells, size: size, last: Math.max.apply(null, cells.map(function (c) { return c.ring; })) };
    };
    var renderCovering = function () {
      curtain.textContent = "";
      wave.cells.forEach(function (cell) {
        var s = mk("span", "cortina-q");
        s.style.left = wave.size * cell.x + "px";
        s.style.top = wave.size * cell.y + "px";
        s.style.width = s.style.height = wave.size + 1 + "px";
        curtain.appendChild(s);
      });
      var covering = wave.cells.length > 0 || open;
      if (covering && !closeWrap) {
        closeWrap = mk("div", "menu-fechar-wrap");
        closeBtn = mk("button", "menu-fechar" + (animated() ? "" : " estatico"));
        closeBtn.type = "button";
        closeBtn.setAttribute("aria-label", "Fechar menu");
        closeBtn.innerHTML = '<span aria-hidden="true" class="barra barra-1" data-bar="1"></span><span aria-hidden="true" class="barra barra-2" data-bar="2"></span><span aria-hidden="true" class="rotor" data-rotor></span>';
        closeWrap.appendChild(closeBtn);
        curtain.after(closeWrap);
        closeBtn.addEventListener("click", function () { hide(); });
      } else if (!covering && closeWrap) {
        closeWrap.remove();
        closeWrap = closeBtn = null;
      }
    };
    var part = function (sel) { return closeBtn ? closeBtn.querySelector(sel) : null; };
    var setOpen = function (on) {
      if (on === open) return;
      open = on;
      toggle.setAttribute("aria-expanded", String(on));
      panel.inert = !on;
      panel.classList.toggle("aberto", on);
      scrollLock(on);
      renderCovering();
      if (on) opened();
    };
    var opened = function () {
      if (closeBtn) closeBtn.focus();
      if (!animated()) return;
      var items = $$("[data-item]", panel);
      var tl = gsap.timeline({ onComplete: function () { busy = false; } });
      tl.to(Array.prototype.slice.call(curtain.children), { opacity: 0, duration: 0.15, stagger: { amount: 0.12, from: "random" } }, 0);
      tl.fromTo(items, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: duration(300), ease: EASE_ENTER, stagger: 0.04 }, 0);
    };
    var show = function () {
      if (busy || open) return;
      if (!animated()) { setOpen(true); return; }
      busy = true;
      wave = buildWave(probe ? probe.offsetWidth || 92 : 92);
      renderCovering();
      var squares = Array.prototype.slice.call(curtain.children);
      var step = RING_MS / 1000;
      var tl = gsap.timeline();
      wave.cells.forEach(function (cell, i) { tl.set(squares[i], { opacity: 1 }, cell.ring * step); });
      tl.to([part('[data-bar="1"]'), part('[data-bar="2"]')], { opacity: 0, duration: 0.1 }, 0);
      tl.set(part("[data-rotor]"), { opacity: 1 }, 0);
      tl.fromTo(part("[data-rotor]"), { rotation: 0 }, { rotation: ROTOR_TURN, duration: duration(ROTOR_MS), ease: "power2.in" }, 0);
      tl.to(part("[data-rotor]"), { opacity: 0, duration: duration(300) }, duration(ROTOR_MS));
      tl.to(part('[data-bar="1"]'), { y: 4, rotation: 45, opacity: 1, duration: duration(300), ease: EASE_ENTER }, duration(ROTOR_MS));
      tl.to(part('[data-bar="2"]'), { y: -4, rotation: -45, opacity: 1, duration: duration(300), ease: EASE_ENTER }, duration(ROTOR_MS));
      tl.call(function () { setOpen(true); }, undefined, wave.last * step + 0.05);
    };
    var reset = function () {
      busy = false;
      wave = { cells: [], size: 0, last: 0 };
      setOpen(false);
      renderCovering();
    };
    var hide = function () {
      if (busy || !open) return;
      if (!animated()) { reset(); toggle.focus(); return; }
      busy = true;
      var squares = Array.prototype.slice.call(curtain.children);
      var step = (RING_MS * CLOSE_K) / 1000;
      var tl = gsap.timeline({ onComplete: function () { wave = { cells: [], size: 0, last: 0 }; renderCovering(); busy = false; toggle.focus(); } });
      tl.to(squares, { opacity: 1, duration: 0.14 }, 0);
      tl.call(function () { setOpen(false); }, undefined, 0.16);
      wave.cells.forEach(function (cell, i) { tl.set(squares[i], { opacity: 0 }, 0.18 + (wave.last - cell.ring) * step); });
      tl.to([part('[data-bar="1"]'), part('[data-bar="2"]')], { opacity: 0, duration: 0.1 }, 0);
      tl.fromTo(part("[data-rotor]"), { opacity: 1, rotation: ROTOR_TURN }, { rotation: 180, duration: duration(ROTOR_MS) * CLOSE_K, ease: "power2.out" }, 0);
    };
    toggle.addEventListener("click", show);
    window.addEventListener("keydown", function (event) {
      if (!open) return;
      if (event.key === "Escape") { event.preventDefault(); hide(); return; }
      if (event.key !== "Tab" || !closeBtn) return;
      var stops = [closeBtn].concat($$("a[href], button", panel));
      var i = stops.indexOf(document.activeElement);
      var next = stops[(i + (event.shiftKey ? -1 : 1) + stops.length) % stops.length];
      event.preventDefault();
      next.focus();
    });
    $$("a", panel).forEach(function (link) {
      link.addEventListener("click", function () {
        if (!open) return;
        if ((link.getAttribute("href") || "").charAt(0) === "#") reset();
      });
    });
    window.addEventListener("resize", function () { if (open && root.clientWidth > 768) reset(); });
  })();

  /* Sem GSAP: a página fica estática e completa. */
  if (!hasMotion) { return; }

  /* ------------------------------------------------------------------------
     Títulos que abrem por quadrados (meia altura de linha), em 700 ms.
     ------------------------------------------------------------------------ */
  var OPEN_MS = 700, BLEED = 4;
  var scatter97 = function (n) { var v = Math.sin(n * 12.9898) * 43758.5453; return v - Math.floor(v); };
  var hideHeading = function (el) { el.style.clipPath = "inset(50%)"; };
  var revealHeading = function (el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var box = el.getBoundingClientRect(), text = range.getBoundingClientRect();
    var size = Math.max(8, Math.round(parseFloat(getComputedStyle(el).lineHeight) / 2));
    var squares = [];
    var left = text.left - box.left - BLEED, top = text.top - box.top - BLEED;
    for (var y = top, row = 0; y < top + text.height + BLEED * 2; y += size, row++) {
      for (var x = left, col = 0; x < left + text.width + BLEED * 2; x += size, col++) {
        squares.push({ d: "M" + x + " " + y + "h" + (size + 1) + "v" + (size + 1) + "h" + -(size + 1) + "z", at: scatter97(row * 97 + col + 1) });
      }
    }
    squares.sort(function (a, b) { return a.at - b.at; });
    var shown = 0, path = "", progress = { value: 0 };
    return gsap.to(progress, {
      value: 1, duration: duration(OPEN_MS), ease: "none",
      onUpdate: function () {
        var count = Math.ceil(progress.value * squares.length);
        if (count === shown) return;
        for (; shown < count; shown++) path += squares[shown].d;
        el.style.clipPath = 'path("' + path + '")';
      },
      onComplete: function () { el.style.removeProperty("clip-path"); }
    });
  };

  /* Ponto verde que pulsa só quando visível. */
  $$(".ponto-vivo").forEach(function (dot) {
    useGsap(dot, function (c) {
      if (c.reduced) return;
      var pulse = gsap.to(dot, { opacity: 0.3, duration: duration(800), ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
      var seen = new IntersectionObserver(function (e) { if (e[0].isIntersecting) pulse.play(); else pulse.pause(); });
      seen.observe(dot);
      return function () { seen.disconnect(); };
    });
  });

  /* ------------------------------------------------------------------------
     Topo: entrada depois do pré-carregamento; no scroll, o fundo amplia e
     o topo se dissolve em módulos cor da página, de baixo para cima.
     ------------------------------------------------------------------------ */
  var RISE_SCATTER = 1.6, HELD_AT = 0.3, RISE_PACE = 1.05, RISE_FADE_MS = 300;
  var LIFT = 6, LIFT_RADIUS = 1.5, LIGHTEN = 0.4, PHOTO_ZOOM = 1.08, PARALLAX = 0.1;
  var scatterRise = function (seed) { var x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  var buildRise = function (layer, strip) {
    var bp = strip.getAttribute("data-tile-strip"), n = COLS[bp];
    var size = parseFloat(getComputedStyle(strip).gridTemplateRows);
    layer.textContent = "";
    if (!(size >= 16)) return [];
    var rows = Math.ceil(heroEl.offsetHeight / size);
    var grid = mk("div", "sobe-grade tiles-" + n);
    grid.style.gridTemplateRows = "repeat(" + rows + ", var(--module))";
    layer.appendChild(grid);
    var cells = [];
    for (var r = 0; r < rows; r++) {
      for (var k = 0; k < n; k++) {
        var el = mk("span", "sobe-q");
        el.style.gridRow = String(rows - r);
        el.style.gridColumnStart = String(k === 0 ? 1 : k + 2);
        el.style.gridColumnEnd = String(k === n - 1 ? -1 : k + 3);
        grid.appendChild(el);
        cells.push({ el: el, at: (r + scatterRise(k * 13 + r * 7) * RISE_SCATTER) / (rows + RISE_SCATTER), on: false });
      }
    }
    var held = $$("[data-tile-row]", strip)
      .filter(function (t) { return t.querySelector(".tile-conteudo"); })
      .map(function (t) { return t.getBoundingClientRect(); });
    cells.forEach(function (cell) {
      var b = cell.el.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2;
      if (held.some(function (t) { return x > t.left && x < t.right && y > t.top && y < t.bottom; })) cell.at = Math.max(cell.at, HELD_AT);
    });
    return cells;
  };
  var heroSetup = function (ready) {
    return useGsap(heroEl, function (c) {
      var q = gsap.utils.selector(heroEl);
      var d = function (ms) { return duration(ms, c.touch); };
      if (c.reduced) return;
      var tl = gsap.timeline({ paused: true });
      if (ready) tl.play();
      tl.from(header, { opacity: 0, duration: d(400) }, 0);
      tl.from(q("[data-hero-lead]"), { y: 16, opacity: 0, duration: d(600), ease: EASE_ENTER, stagger: 0.08 }, 0.2);
      var heading = q("h1")[0];
      hideHeading(heading);
      if (ready) tl.add(function () { revealHeading(heading); }, 0);
      var rows = [1, 2, 3].reduce(function (all, row) { return all.concat(q('[data-tile-row="' + row + '"]')); }, [])
        .filter(function (t) { return t.offsetParent; });
      tl.from(rows, { y: 8, opacity: 0, duration: d(400), ease: EASE_ENTER, stagger: 0.04 }, 0);

      gsap.to(q("[data-hero-photo]"), { scale: PHOTO_ZOOM, yPercent: PARALLAX * 100, ease: "none", scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: true } });

      var rise = q("[data-hero-rise]")[0];
      var cells = [], builtFor = "";
      var paint = function (progress, instant) {
        cells.forEach(function (cell) {
          var on = progress >= cell.at * RISE_PACE;
          if (on === cell.on) return;
          cell.on = on;
          if (instant) gsap.set(cell.el, { opacity: on ? 1 : 0, overwrite: true });
          else gsap.to(cell.el, { opacity: on ? 1 : 0, duration: d(RISE_FADE_MS), ease: EASE_ENTER, overwrite: true });
        });
      };
      var build = function (progress) {
        var strip = q("[data-tile-strip]").filter(function (s) { return s.offsetParent; })[0];
        var size = heroEl.offsetWidth + "x" + heroEl.offsetHeight;
        if (strip && size !== builtFor) { builtFor = size; cells = buildRise(rise, strip); }
        paint(progress, true);
      };
      var riseTrigger = ST.create({
        trigger: heroEl, start: "top top", end: "bottom top",
        onUpdate: function (self) { paint(self.progress); },
        onRefresh: function (self) { build(self.progress); }
      });
      build(riseTrigger.progress);
      var clearRise = function () { rise.textContent = ""; };
      if (c.touch) return clearRise;

      var glass = q("[data-tile-kind='glass']");
      var move = function (event) {
        var vis = glass.filter(function (t) { return t.offsetParent; });
        var size = vis[0] ? vis[0].getBoundingClientRect().height : 1;
        vis.forEach(function (tile) {
          var r = tile.getBoundingClientRect();
          var near = Math.hypot(event.clientX - (r.left + r.width / 2), event.clientY - (r.top + r.height / 2)) < size * LIFT_RADIUS;
          gsap.to(tile, { y: near ? -LIFT : 0, duration: duration(400), ease: EASE_ENTER, overwrite: "auto" });
          gsap.to(tile.querySelector("[data-tile-light]"), { opacity: near ? LIGHTEN : 0, duration: duration(400), overwrite: "auto" });
        });
      };
      var leave = function () {
        gsap.to(glass, { y: 0, duration: duration(400), ease: EASE_ENTER });
        gsap.to(q("[data-tile-light]"), { opacity: 0, duration: duration(400) });
      };
      heroEl.addEventListener("pointermove", move);
      heroEl.addEventListener("pointerleave", leave);
      return function () { clearRise(); heroEl.removeEventListener("pointermove", move); heroEl.removeEventListener("pointerleave", leave); };
    });
  };
  if (heroEl) {
    var heroMotion = heroSetup(false);
    whenLoaded.push(function () { heroMotion.revert(); heroMotion = heroSetup(true); ST.refresh(); });
    if (preloaderDone) { heroMotion.revert(); heroMotion = heroSetup(true); }
  }

  /* ------------------------------------------------------------------------
     Títulos das seções abrem por quadrados; o texto parado sobe 16 px.
     ------------------------------------------------------------------------ */
  (function textReveal() {
    if (motionOff()) return;
    var headings = $$("main .secao h2, footer h2");
    var bodies = $$("main .secao > p, .proc-aviso, .ft-lead").filter(function (el) { return el.textContent.trim(); });
    headings.forEach(hideHeading);
    gsap.set(bodies, { opacity: 0, y: 16 });
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        seen.unobserve(entry.target);
        if (headings.indexOf(entry.target) >= 0) revealHeading(entry.target);
        else gsap.to(entry.target, { opacity: 1, y: 0, duration: duration(600), ease: EASE_ENTER, clearProps: "opacity,transform" });
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    headings.concat(bodies).forEach(function (el) { seen.observe(el); });
  })();

  /* ------------------------------------------------------------------------
     O que fazemos: as palavras escurecem linha a linha; o véu das fotos cai.
     ------------------------------------------------------------------------ */
  (function whatWeDo() {
    var section = $("#o-que-fazemos");
    if (!section) return;
    var PALE = 0.18, PHOTO_PALE = 0.3;
    useGsap(section, function (c) {
      if (c.reduced) return;
      $$("[data-line]", section).forEach(function (line) {
        var words = $$("[data-word]", line), veil = $$("[data-photo-veil]", line);
        gsap.set(words, { opacity: PALE });
        gsap.set(veil, { opacity: 1 - PHOTO_PALE });
        gsap.to(words, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: line, start: "top 75%", end: "center 50%", scrub: true } });
        gsap.to(veil, { opacity: 0, duration: 0.01, ease: "none", stagger: { amount: duration(600, c.touch), from: "random" }, scrollTrigger: { trigger: line, start: "center 50%", toggleActions: "play none none reverse" } });
      });
    });
  })();

  /* ------------------------------------------------------------------------
     Como funciona: fixado no scroll. Cada etapa ocupa um terço; a próxima
     chega em módulos sobre a caixa toda, em ordem aleatória.
     ------------------------------------------------------------------------ */
  (function processBlock() {
    var section = $("#como-funciona");
    if (!section) return;
    var box = $("[data-proc-box]", section);
    var squaresBox = $("[data-squares]", section);
    var photos = $$("[data-stage-photo]", section);
    var words = $$("[data-stage-word]", section);
    var texts = $$("[data-stage-text]", section);
    var buttons = $$(".lt-etapas button", section);
    var bar = $("[data-bar]", section), handle = $("[data-handle]", section);
    var N = photos.length;
    var PALETTES = [
      ["#241C15", "#2C231A", "#1F1914", "#00973A", "#C58A52"],
      ["#EAE4DA", "#E2DACD", "#F4F1EC", "#DDD5C8", "#C58A52"],
      ["#713E1A", "#7E4720", "#8A5231", "#C58A52", "#5E3416"]
    ];
    var BOX_H = fl(690, 499, 369, 440);
    var HANDLE_W = fl(16, 12, 12, 12);
    var TILE_OPACITY = 0.5, TILE_LIFE = 600, SQUARE_FADE = 400, LANDING = 900, WORD_MS = 600, TEXT_MS = 500, PIN_MARGIN = 20;
    var jump = function () {};
    buttons.forEach(function (b, i) { b.addEventListener("click", function () { jump(i); }); });
    var current = 0;
    var setStage = function (next) {
      buttons.forEach(function (b, i) { if (i === next) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    };
    setStage(0);
    var setProgress = function (t) {
      bar.style.width = "calc(" + HANDLE_W + " / 2 + (100% - " + HANDLE_W + ") * " + t + ")";
      handle.style.left = "calc((100% - " + HANDLE_W + ") * " + t + ")";
    };
    var squares = [];
    var buildSquares = function () {
      var cols = root.clientWidth > 560 ? 12 : 4;
      var size = box.clientWidth / cols;
      var rows = Math.ceil(box.clientHeight / size);
      squaresBox.textContent = "";
      squaresBox.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
      squaresBox.style.gridAutoRows = size + "px";
      squares = [];
      for (var i = 0; i < cols * rows; i++) {
        var s = mk("div", "proc-q");
        s.appendChild(mk("span"));
        squaresBox.appendChild(s);
        squares.push(s);
      }
    };

    useGsap(section, function (c) {
      var d = function (ms) { return duration(c.reduced ? 200 : ms, c.touch); };
      var tl = null, landing = null;
      var showStatic = function (index) {
        photos.forEach(function (p, i) { gsap.set(p, { autoAlpha: i === index ? 1 : 0 }); });
        words.forEach(function (w, i) { gsap.set(w, { yPercent: i === index ? 0 : 100, autoAlpha: i === index ? 1 : 0 }); });
        texts.forEach(function (t, i) { gsap.set(t, { autoAlpha: i === index ? 1 : 0 }); });
      };
      var goTo = function (next) {
        if (next === current || next < 0 || next >= N) return;
        var from = current;
        current = next;
        setStage(next);
        if (tl) tl.progress(1).kill();
        if (landing) landing.progress(1).kill();
        var dir = next > from ? 1 : -1;
        tl = gsap.timeline();
        tl.to(words[from], { yPercent: -100 * dir, autoAlpha: 0, duration: d(WORD_MS), ease: EASE_SCROLL }, 0)
          .fromTo(words[next], { yPercent: 100 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: d(WORD_MS), ease: EASE_SCROLL }, 0)
          .to(texts[from], { autoAlpha: 0, duration: d(TEXT_MS), ease: EASE_ENTER }, 0)
          .to(texts[next], { autoAlpha: 1, duration: d(TEXT_MS), ease: EASE_ENTER }, d(200));
        if (c.reduced) {
          tl.to(photos[from], { autoAlpha: 0, duration: d(200) }, 0).to(photos[next], { autoAlpha: 1, duration: d(200) }, 0);
          return;
        }
        if (!squares.length) buildSquares();
        var pal = PALETTES[next] || PALETTES[0];
        landing = gsap.timeline();
        squares.forEach(function (sq) {
          sq.style.backgroundColor = pal[Math.floor(Math.random() * pal.length)];
          var tile = sq.firstElementChild;
          var at = d(LANDING) * Math.random();
          landing.set(tile, { opacity: TILE_OPACITY }, 0)
            .fromTo(sq, { autoAlpha: 0 }, { autoAlpha: 1, duration: d(SQUARE_FADE), ease: EASE_ENTER, immediateRender: false }, at)
            .to(tile, { opacity: 0, duration: d(TILE_LIFE), ease: EASE_ENTER }, at);
        });
        var landed = d(LANDING + Math.max(TILE_LIFE, SQUARE_FADE));
        landing.set(photos[next], { autoAlpha: 1 }, landed).set(photos[from], { autoAlpha: 0 }, landed)
          .to(squares, { autoAlpha: 0, duration: d(SQUARE_FADE), ease: EASE_ENTER }, landed);
      };

      showStatic(current);
      setProgress(current / (N - 1));
      var onResize = function () { squares = []; squaresBox.textContent = ""; };
      window.addEventListener("resize", onResize);
      var stop = function () { window.removeEventListener("resize", onResize); if (landing) landing.kill(); if (tl) tl.kill(); box.style.removeProperty("--box-h"); };

      // A caixa cabe na tela junto com o título e a linha do tempo; se não couber, não fixa.
      var headerH = header ? header.offsetHeight : 0;
      var room = window.innerHeight - headerH;
      box.style.removeProperty("--box-h");
      var others = section.offsetHeight - box.offsetHeight;
      var fit = Math.min(box.offsetHeight, room - others - (PIN_MARGIN * remPx()));
      var tooLow = c.low || fit < 240;
      if (c.reduced || tooLow) {
        jump = function (i) { goTo(i); setProgress(i / (N - 1)); };
        return stop;
      }
      box.style.setProperty("--box-h", Math.round(fit) + "px");

      var stPin = ST.create({
        trigger: section,
        start: function () {
          var h = header ? header.offsetHeight : 0, rm = window.innerHeight - h;
          return "top " + (section.offsetHeight <= rm ? h + (rm - section.offsetHeight) / 2 : window.innerHeight - section.offsetHeight - PIN_MARGIN * remPx()) + "px";
        },
        end: "+=" + N * 100 + "%",
        pin: true, pinSpacing: true, scrub: true, invalidateOnRefresh: true, refreshPriority: 1,
        onUpdate: function (self) {
          var t = Math.min(1, (self.progress * N) / (N - 1));
          setProgress(t);
          goTo(Math.min(N - 1, Math.floor(self.progress * N)));
        }
      });
      ST.refresh();
      jump = function (index) {
        var y = stPin.start + ((stPin.end - stPin.start) * (index + 0.02)) / N;
        if (lenis) lenis.scrollTo(y, { duration: d(800) }); else window.scrollTo(0, y);
      };
      return stop;
    });
  })();

  /* ------------------------------------------------------------------------
     Linhas e projetos: cards sobem da esquerda para a direita; marquee das
     linhas a 40 px de desenho por segundo, só quando visível; o hover para.
     ------------------------------------------------------------------------ */
  (function cardsAndMarquee() {
    var section = $("#projetos");
    if (!section) return;
    useGsap(section, function (c) {
      var cards = $$("[data-card]", section);
      if (c.reduced) return;
      gsap.from(cards, { y: 40, opacity: 0, duration: duration(600, c.touch), ease: EASE_ENTER, stagger: 0.08, scrollTrigger: { trigger: $("[data-cards]", section), start: "top 80%" } });
      var track = $("[data-track]", section);
      if (!track) return;
      var SPEED = 40, xPos = 0, paused = false, period = track.scrollWidth / 2;
      var ro = new ResizeObserver(function () { period = track.scrollWidth / 2; });
      ro.observe(track);
      var tick = function (_t, dtMs) {
        if (paused || !period) return;
        xPos = (xPos - (SPEED * remPx() * dtMs) / 1000) % period;
        gsap.set(track, { x: xPos });
      };
      var running = false;
      var io = new IntersectionObserver(function (e) {
        var on = e[0].isIntersecting;
        if (on && !running) gsap.ticker.add(tick); else if (!on && running) gsap.ticker.remove(tick);
        running = on;
      });
      io.observe(track.parentElement);
      var enter = function () { paused = true; }, leave = function () { paused = false; };
      if (!c.touch) { track.addEventListener("mouseenter", enter); track.addEventListener("mouseleave", leave); }
      return function () { io.disconnect(); ro.disconnect(); gsap.ticker.remove(tick); track.removeEventListener("mouseenter", enter); track.removeEventListener("mouseleave", leave); gsap.set(track, { x: 0 }); };
    });
  })();

  /* Rodapé: o fundo se move 15 % mais devagar que a página. */
  (function footerParallax() {
    var el = $("footer.ft"), bg = el && $("[data-photo]", el);
    if (!bg) return;
    useGsap(el, function (c) {
      if (c.reduced) return;
      gsap.fromTo(bg, { yPercent: -15 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } });
    });
  })();

  /* ------------------------------------------------------------------------
     Cursor (ponteiro fino acima de 1024): módulo verde de 8 px; 56 com rótulo
     sobre [data-cursor]; linha de 2 px sob os links.
     ------------------------------------------------------------------------ */
  (function cursor() {
    var el = $("[data-cursor-dot]"), label = el && el.firstElementChild;
    var FINE = "(hover: hover) and (pointer: fine) and (min-width: 1025px)";
    if (!el || motionOff() || !window.matchMedia(FINE).matches) return;
    var SIZE = 8, BIG = 56, LINE = 2, LERP = 0.5;
    root.setAttribute("data-custom-cursor", "");
    var pos = { x: -100, y: -100 }, target = { x: -100, y: -100 }, lockedTo = null;
    var setX = gsap.quickSetter(el, "x", "px"), setY = gsap.quickSetter(el, "y", "px");
    setX(pos.x); setY(pos.y);
    gsap.ticker.add(function (_t, dtMs) {
      var k = 1 - Math.pow(1 - LERP, dtMs / (1000 / 60));
      var goal = lockedTo ? { x: lockedTo.left + lockedTo.width / 2, y: lockedTo.bottom + (LINE * remPx()) / 2 } : target;
      var dx = goal.x - pos.x, dy = goal.y - pos.y;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return;
      pos.x += dx * k; pos.y += dy * k;
      setX(pos.x); setY(pos.y);
    });
    var shape = function (w, h, text, color) {
      label.textContent = text || "";
      el.style.backgroundColor = color || "";
      gsap.to(el, { width: w, height: h, duration: duration(200), ease: EASE_ENTER, overwrite: "auto" });
      gsap.to(label, { opacity: text ? 1 : 0, duration: duration(200) });
    };
    window.addEventListener("pointermove", function (e) {
      if (target.x === -100) { pos.x = e.clientX; pos.y = e.clientY; setX(pos.x); setY(pos.y); }
      target.x = e.clientX; target.y = e.clientY;
    }, { passive: true });
    window.addEventListener("pointerover", function (e) {
      var node = e.target instanceof Element ? e.target : null;
      var labelled = node && node.closest("[data-cursor]");
      if (labelled) { lockedTo = null; shape(BIG * remPx(), BIG * remPx(), labelled.getAttribute("data-cursor"), "#00702B"); return; }
      var link = node && node.closest("a:not([data-cursor-plain]), button:not([data-cursor-plain])");
      if (link) { lockedTo = link.getBoundingClientRect(); shape(lockedTo.width, LINE * remPx(), "", getComputedStyle(link).color); return; }
      lockedTo = null;
      shape(SIZE * remPx(), SIZE * remPx());
    }, { passive: true });
    window.addEventListener("scroll", function () { lockedTo = null; }, { passive: true });
  })();

  window.addEventListener("load", function () { ST.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
})();
