/* preloader.js · Monta as faixas de módulos claros do pré-carregamento antes da primeira pintura.
   18 linhas de módulos sobre o topo e o bloco escuro com o contador no canto inferior direito.
   Segurança: se o js/main.js não rodar (erro, bloqueio), o pré-carregamento some sozinho em 4 s. */
(function () {
  var el = document.querySelector("[data-preloader]");
  if (!el) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ROWS = 18;
  var FRAMES = [["base", 4, 2], ["md", 8, 2], ["lg", 12, 3], ["xl", 12, 3]];
  var place = function (node, row, rowSpan, k, w, n) {
    node.style.gridRow = row + " / span " + rowSpan;
    node.style.gridColumnStart = String(k === 0 ? 1 : k + 2);
    node.style.gridColumnEnd = String(k + w === n ? -1 : k + w + 2);
  };
  FRAMES.forEach(function (f) {
    var bp = f[0], n = f[1], w = f[2];
    var strip = document.createElement("div");
    strip.className = "pre-faixa tiles-" + n + " so-" + bp;
    strip.setAttribute("data-preloader-strip", "");
    strip.style.gridTemplateRows = "repeat(" + ROWS + ", var(--module))";
    for (var i = 0; i < ROWS * n; i++) {
      var r = Math.floor(i / n), k = i % n;
      if (r >= ROWS - 2 && k >= n - w) continue;
      var sq = document.createElement("span");
      sq.className = "pre-q";
      sq.setAttribute("data-preloader-square", "");
      place(sq, r + 1, 1, k, 1, n);
      strip.appendChild(sq);
    }
    var counter = document.createElement("div");
    counter.className = "pre-contador";
    counter.setAttribute("data-preloader-counter", "");
    place(counter, ROWS - 1, 2, n - w, w, n);
    counter.innerHTML = '<span class="t-body-s">Carregando</span><span class="t-h1" data-preloader-count>0</span>';
    strip.appendChild(counter);
    el.appendChild(strip);
  });
  if (reduced) el.classList.add("pre-reduzido");
  window.setTimeout(function () {
    if (!el.hasAttribute("data-done")) { el.classList.add("pre-saindo"); window.setTimeout(function () { el.hidden = true; }, 300); }
  }, 4000);
})();
