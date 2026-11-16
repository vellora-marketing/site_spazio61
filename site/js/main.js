/*
 * main.js · Spazio 61 (demonstração)
 * Script clássico (sem type="module", para abrir também por file://). Sem bibliotecas.
 * - Preenche a página com os dados de config.js (o HTML já tem o texto público como reserva).
 * - Menu do celular acessível.
 * - Revelações de entrada com IntersectionObserver.
 * - Letras do "spazio 61" do topo em velocidades diferentes no scroll.
 * - Parallax de foto: mecanismo pronto e desligado (só img[data-parallax] com ≥ 1600 px).
 * - Formulário com envio SIMULADO: nenhuma requisição de rede, nada gravado no navegador.
 * Scroll nativo: nenhum preventDefault em wheel/touch, nenhum smooth-scroll em JS.
 */
(function () {
  "use strict";

  var d = document;
  var root = d.documentElement;
  var cfg = window.SPAZIO_CONFIG || null;
  var mqReduz = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  function reduzMovimento() { return !!(mqReduz && mqReduz.matches); }
  function todos(sel, ctx) { return Array.prototype.slice.call((ctx || d).querySelectorAll(sel)); }
  function ler(obj, caminho) {
    return caminho.split(".").reduce(function (o, k) { return o && o[k] !== undefined ? o[k] : undefined; }, obj);
  }
  function aoMudar(mq, fn) {
    if (!mq) return;
    if (mq.addEventListener) mq.addEventListener("change", fn);
    else if (mq.addListener) mq.addListener(fn);
  }

  /* ------------------------------------------------------------------ */
  /* 1. Conteúdo a partir do config.js                                   */
  /* ------------------------------------------------------------------ */
  function linkWhatsApp() {
    var w = cfg && cfg.whatsapp;
    if (!w || !w.numero) return null;
    return "https://wa.me/" + String(w.numero).replace(/\D/g, "") + "?text=" + encodeURIComponent(w.mensagem || "");
  }

  function linkMapa() {
    var busca = ler(cfg, "endereco.busca");
    if (!busca) return null;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(busca);
  }

  function aplicarConfig() {
    if (!cfg) return;

    var wa = linkWhatsApp();
    if (wa) {
      todos("[data-whatsapp]").forEach(function (a) {
        a.href = wa;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        if (!a.querySelector(".aviso-nova-aba")) {
          var aviso = d.createElement("span");
          aviso.className = "sr-only aviso-nova-aba";
          aviso.textContent = " (abre em nova aba)";
          a.appendChild(aviso);
        }
      });
    }

    var mapa = linkMapa();
    if (mapa) todos("[data-mapa]").forEach(function (a) { a.href = mapa; });

    if (cfg.instagram) todos("[data-instagram]").forEach(function (a) { a.href = cfg.instagram; });

    todos("[data-cfg]").forEach(function (el) {
      var v = ler(cfg, el.getAttribute("data-cfg"));
      if (typeof v === "string" && v) el.textContent = v;
    });

    todos("[data-cfg-mailto]").forEach(function (a) {
      var v = ler(cfg, a.getAttribute("data-cfg-mailto"));
      if (typeof v === "string" && v) { a.href = "mailto:" + v; a.textContent = v; }
    });

    renderizarProjetos();
  }

  function renderizarProjetos() {
    var grade = d.getElementById("projetos-grade");
    if (!grade || !Array.isArray(cfg.projetos) || !cfg.projetos.length) return;

    var frag = d.createDocumentFragment();
    cfg.projetos.forEach(function (p, i) {
      var li = d.createElement("li");
      li.className = "proj reveal" + (i % 3 ? " d" + (i % 3) : "");
      var fig = d.createElement("figure");
      var midia = d.createElement("div");
      midia.className = "proj-midia";

      if (p && p.src && !p.placeholder) {
        var img = d.createElement("img");
        img.src = p.src;
        img.alt = p.alt || "";
        if (p.largura) img.width = p.largura;
        if (p.altura) img.height = p.altura;
        img.loading = "lazy";
        img.decoding = "async";
        if (p.parallax) img.setAttribute("data-parallax", "");
        midia.appendChild(img);
      } else {
        li.className += " proj-placeholder";
        midia.setAttribute("data-placeholder", "");
        var rot = d.createElement("span");
        rot.className = "proj-rotulo";
        rot.textContent = "Foto a confirmar";
        midia.appendChild(rot);
      }

      fig.appendChild(midia);
      if (p && p.legenda) {
        var cap = d.createElement("figcaption");
        cap.textContent = p.legenda;
        fig.appendChild(cap);
      }
      li.appendChild(fig);
      frag.appendChild(li);
    });

    while (grade.firstChild) grade.removeChild(grade.firstChild);
    grade.appendChild(frag);
  }

  /* ------------------------------------------------------------------ */
  /* 2. Menu do celular                                                  */
  /* ------------------------------------------------------------------ */
  function iniciarMenu() {
    var nav = d.querySelector(".nav");
    var botao = d.querySelector(".nav-toggle");
    var painel = d.getElementById("menu-principal");
    if (!nav || !botao || !painel) return;

    var mqDesk = window.matchMedia ? window.matchMedia("(min-width: 900px)") : null;
    function ehDesktop() { return !!(mqDesk && mqDesk.matches); }
    function aberto() { return botao.getAttribute("aria-expanded") === "true"; }

    function sincronizar() {
      // Fechado no celular: fora da ordem de tabulação e da árvore de acessibilidade.
      if (!ehDesktop() && !aberto()) painel.setAttribute("inert", "");
      else painel.removeAttribute("inert");
    }

    function definir(abrir, devolverFoco) {
      botao.setAttribute("aria-expanded", abrir ? "true" : "false");
      botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("nav-aberta", abrir);
      sincronizar();
      if (!abrir && devolverFoco) botao.focus();
    }

    botao.addEventListener("click", function () { definir(!aberto(), false); });

    d.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && aberto()) {
        definir(false, true);
      }
    });

    todos("a", painel).forEach(function (a) {
      a.addEventListener("click", function () { if (aberto()) definir(false, false); });
    });

    d.addEventListener("click", function (e) {
      if (aberto() && !nav.contains(e.target)) definir(false, false);
    });

    aoMudar(mqDesk, function () { definir(false, false); });
    definir(false, false);
  }

  /* ------------------------------------------------------------------ */
  /* 2b. Nav clara sobre seções claras (contraste ≥ 4,5:1 em qualquer    */
  /*     fundo). IntersectionObserver numa linha de 1 px na altura do     */
  /*     meio da nav; sem listener de scroll.                             */
  /* ------------------------------------------------------------------ */
  function iniciarNavTema() {
    var nav = d.querySelector(".nav");
    var claras = todos("main .claro, main .painel");
    if (!nav || !claras.length || !("IntersectionObserver" in window)) return;
    var ativas = [];
    var io = null;

    function criar() {
      if (io) io.disconnect();
      ativas = [];
      var r = nav.getBoundingClientRect();
      var linha = Math.round(r.top + r.height / 2);
      var baixo = Math.max(0, window.innerHeight - linha - 1);
      io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          var i = ativas.indexOf(en.target);
          if (en.isIntersecting && i < 0) ativas.push(en.target);
          if (!en.isIntersecting && i >= 0) ativas.splice(i, 1);
        });
        nav.classList.toggle("nav-clara", ativas.length > 0);
      }, { rootMargin: "-" + linha + "px 0px -" + baixo + "px 0px", threshold: 0 });
      claras.forEach(function (s) { io.observe(s); });
    }

    var t = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(t);
      t = window.setTimeout(criar, 150);
    }, { passive: true });
    criar();
  }

  /* ------------------------------------------------------------------ */
  /* 3. Revelações de entrada                                            */
  /* ------------------------------------------------------------------ */
  function iniciarRevelacoes() {
    if (!("IntersectionObserver" in window) || reduzMovimento()) return;
    var alvos = todos(".reveal");
    if (!alvos.length) return;

    root.classList.add("reveal-ready");
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    alvos.forEach(function (el) { io.observe(el); });

    // Se o usuário ativar "reduzir movimento" depois, mostra tudo de uma vez.
    aoMudar(mqReduz, function () {
      if (reduzMovimento()) {
        alvos.forEach(function (el) { el.classList.add("is-in"); io.unobserve(el); });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Letras do topo + parallax de foto (desligado)                    */
  /*    Listener de scroll passivo; requestAnimationFrame só quando houve */
  /*    scroll; nada roda com a página parada, fora da tela ou com        */
  /*    reduced-motion.                                                   */
  /* ------------------------------------------------------------------ */
  var LARGURA_MIN_PARALLAX = 1600;

  function iniciarMovimento() {
    var hero = d.querySelector(".hero");
    var letras = todos(".hero-marca .ml").map(function (el) {
      return { el: el, vel: parseFloat(el.getAttribute("data-vel")) || 0 };
    });

    // Parallax de foto: só imagens marcadas E com resolução de verdade. Hoje nenhuma se qualifica.
    var fotos = [];
    todos("img[data-parallax]").forEach(function (img) {
      function avaliar() {
        if (img.naturalWidth >= LARGURA_MIN_PARALLAX) {
          img.classList.add("parallax-ativo");
          fotos.push({ el: img, visivel: false });
          observarFoto(fotos[fotos.length - 1]);
        }
      }
      if (img.complete) avaliar(); else img.addEventListener("load", avaliar, { once: true });
    });

    var heroVisivel = true;
    var pendente = false;
    var ligado = false;
    var ioFotos = null;

    function observarFoto(f) {
      if (!("IntersectionObserver" in window)) return;
      if (!ioFotos) {
        ioFotos = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            fotos.forEach(function (x) { if (x.el === en.target) x.visivel = en.isIntersecting; });
          });
        });
      }
      ioFotos.observe(f.el);
    }

    function atualizar() {
      pendente = false;
      var y = window.pageYOffset || root.scrollTop || 0;
      if (heroVisivel) {
        for (var i = 0; i < letras.length; i++) {
          letras[i].el.style.setProperty("--lift", (-y * letras[i].vel).toFixed(1) + "px");
        }
      }
      var meio = window.innerHeight / 2;
      for (var j = 0; j < fotos.length; j++) {
        if (!fotos[j].visivel) continue;
        var r = fotos[j].el.getBoundingClientRect();
        fotos[j].el.style.setProperty("--py", ((r.top + r.height / 2 - meio) * -0.06).toFixed(1) + "px");
      }
    }

    function aoRolar() {
      if (pendente) return;
      pendente = true;
      window.requestAnimationFrame(atualizar);
    }

    function ligar() {
      if (ligado || reduzMovimento()) return;
      ligado = true;
      window.addEventListener("scroll", aoRolar, { passive: true });
      aoRolar();
    }

    function desligar() {
      if (!ligado) return;
      ligado = false;
      window.removeEventListener("scroll", aoRolar);
      letras.forEach(function (l) { l.el.style.removeProperty("--lift"); });
      fotos.forEach(function (f) { f.el.style.removeProperty("--py"); });
    }

    if (hero && "IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) {
        heroVisivel = ents[0].isIntersecting;
        if (heroVisivel && ligado) aoRolar();
      }).observe(hero);
    }

    aoMudar(mqReduz, function () { if (reduzMovimento()) desligar(); else ligar(); });
    if (letras.length || todos("img[data-parallax]").length) ligar();
  }

  /* ------------------------------------------------------------------ */
  /* 5. Formulário (envio simulado)                                      */
  /* ------------------------------------------------------------------ */
  function iniciarFormulario() {
    var form = d.getElementById("form-contato");
    if (!form) return;
    var status = d.getElementById("form-status");
    form.noValidate = true;

    var regras = {
      nome: function (v) {
        return v.trim().length >= 2 ? "" : "Informe o seu nome.";
      },
      telefone: function (v) {
        var n = v.replace(/\D/g, "");
        if (!n) return "Informe o seu telefone com DDD.";
        return n.length >= 10 && n.length <= 11 ? "" : "Confira o telefone: use o DDD e o número, por exemplo (61) 99999-9999.";
      },
      email: function (v) {
        var t = v.trim();
        if (!t) return "Informe o seu e-mail.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t) ? "" : "Confira o e-mail, por exemplo nome@dominio.com.br.";
      }
    };

    function campo(nome) { return form.elements[nome]; }
    function erroEl(nome) { return d.getElementById("erro-" + nome); }

    function marcar(nome, msg) {
      var input = campo(nome);
      var el = erroEl(nome);
      if (!input || !el) return;
      if (msg) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", el.id);
        el.textContent = msg;
        el.hidden = false;
      } else {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        el.textContent = "";
        el.hidden = true;
      }
    }

    var tentou = false;
    Object.keys(regras).forEach(function (nome) {
      var input = campo(nome);
      if (!input) return;
      input.addEventListener("input", function () {
        if (tentou && input.getAttribute("aria-invalid") === "true") marcar(nome, regras[nome](input.value));
      });
      input.addEventListener("blur", function () {
        if (tentou) marcar(nome, regras[nome](input.value));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // nada sai daqui: sem fetch, sem navegação, sem armazenamento
      tentou = true;
      if (status) status.textContent = "";

      var primeiro = null;
      Object.keys(regras).forEach(function (nome) {
        var input = campo(nome);
        if (!input) return;
        var msg = regras[nome](input.value);
        marcar(nome, msg);
        if (msg && !primeiro) primeiro = input;
      });

      if (primeiro) { primeiro.focus(); return; }

      var nome = campo("nome").value.trim().split(/\s+/)[0];
      form.reset();
      tentou = false;
      if (status) {
        status.textContent = "Obrigado, " + nome + "! Na versão final, a equipe da Spazio 61 retornaria o seu contato. " +
          "Esta é uma demonstração: nada foi enviado nem guardado.";
      }
    });
  }

  /* ------------------------------------------------------------------ */
  function iniciar() {
    aplicarConfig();
    iniciarMenu();
    iniciarNavTema();
    iniciarRevelacoes();
    iniciarMovimento();
    iniciarFormulario();
  }

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
