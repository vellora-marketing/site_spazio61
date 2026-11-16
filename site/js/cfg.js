/* cfg.js · Preenche a página com os valores do config.js (textos, WhatsApp, mapa, Instagram, e-mail, ano).
   Usado pela página inicial e pela política. Só textContent e atributos: nada de HTML vindo do config. */
(function () {
  var cfg = window.SPAZIO_CONFIG;
  if (!cfg) return;
  var get = function (path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, cfg);
  };
  var safeUrl = function (u) { return /^https:\/\//.test(String(u || "")) ? String(u) : null; };
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = get(el.getAttribute("data-cfg"));
    if (typeof v === "string" || typeof v === "number") el.textContent = String(v);
  });
  var w = cfg.whatsapp || {};
  var zap = "https://wa.me/" + String(w.numero || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(w.mensagem || "");
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) { a.href = zap; });
  if (cfg.endereco && cfg.endereco.busca) {
    var mapa = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(cfg.endereco.busca);
    document.querySelectorAll("[data-mapa]").forEach(function (a) { a.href = mapa; });
  }
  var insta = cfg.instagram && safeUrl(cfg.instagram.url);
  if (insta) document.querySelectorAll("[data-instagram]").forEach(function (a) { a.href = insta; });
  document.querySelectorAll("[data-cfg-mailto]").forEach(function (a) {
    var v = get(a.getAttribute("data-cfg-mailto"));
    if (v && /^[^\s@<>"]+@[^\s@<>"]+$/.test(v)) { a.href = "mailto:" + v; a.textContent = v; }
  });
  document.querySelectorAll("[data-ano]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
