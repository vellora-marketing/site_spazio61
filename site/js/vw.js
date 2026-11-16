/* vw.js · Grid Kelder: --vw é a largura útil do layout (clientWidth, presa em 1920) e --vw-full a largura total.
   Carregado de forma síncrona no <head> para valer já na primeira pintura. */
(function () {
  var d = document.documentElement;
  d.className = d.className.replace(/\bno-js\b/, "js");
  function s() {
    var w = d.clientWidth;
    if (w < 200) w = Math.max(window.innerWidth, 320);
    d.style.setProperty("--vw", Math.min(w, 1920) + "px");
    d.style.setProperty("--vw-full", w + "px");
  }
  s();
  if (window.ResizeObserver) new ResizeObserver(s).observe(d);
  else window.addEventListener("resize", s);
})();
