/*
 * boot.js · roda no <head>, antes de desenhar a página (script clássico, sem defer).
 * 1. Marca que há JS (.has-js), para o CSS montar o menu do celular.
 * 2. Pré-carregador opcional e seguro: só aparece porque esta classe é adicionada aqui;
 *    dura no máximo 1,5 s (1 s de contagem + 0,5 s abrindo), mesmo que o resto do JS falhe.
 *    Não roda com prefers-reduced-motion.
 */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("has-js");

  var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduz || !window.requestAnimationFrame || !document.addEventListener) return;
  if (!root.hasAttribute("data-preloader")) return;

  root.classList.add("preloading");

  var acabou = false;
  function abrir() {
    if (acabou) return;
    acabou = true;
    root.classList.add("preloader-abrindo"); // o scroll é liberado aqui
    window.setTimeout(function () {
      root.classList.remove("preloading", "preloader-abrindo");
    }, 520);
  }

  // Limite rígido: abre em 1 s aconteça o que acontecer.
  window.setTimeout(abrir, 1000);

  document.addEventListener("DOMContentLoaded", function () {
    var conta = document.getElementById("preloader-conta");
    if (!conta) { abrir(); return; }
    var inicio = null;
    function passo(t) {
      if (acabou) { conta.textContent = "100"; return; }
      if (inicio === null) inicio = t;
      var p = Math.min(1, (t - inicio) / 850);
      conta.textContent = String(Math.round(p * 100));
      if (p < 1) window.requestAnimationFrame(passo);
      else abrir();
    }
    window.requestAnimationFrame(passo);
  });
})();
