/* ============================================================
   Knowledge Reach Connections — Shared Scripts
   ============================================================ */
(function () {
  "use strict";

  /* ---- Sticky / solid nav ---- */
  var header = document.getElementById("header");
  if (header) {
    var isHome = header.classList.contains("on-hero");
    function onScroll() {
      if (!isHome) { header.classList.add("solid"); return; }
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile drawer ---- */
  var openBtn = document.getElementById("menuBtn");
  var drawer = document.getElementById("drawer");
  var closeBtn = document.getElementById("drawerClose");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (drawer) drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setDrawer(false); });
  });

  /* ---- Current year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add("in"); }, (i % 4) * 90);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up stats ---- */
  var countEls = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && countEls.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || "";
        var dur = 1600, start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = (target >= 100 ? Math.round(val).toLocaleString() : val.toFixed(0)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = (target >= 100 ? Math.round(target).toLocaleString() : target) + suffix;
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    countEls.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Fund allocation bars ---- */
  var fills = document.querySelectorAll(".fund-fill");
  if ("IntersectionObserver" in window && fills.length) {
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct + "%";
          fio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(function (el) { fio.observe(el); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- Impact calculator ---- */
  var slider = document.getElementById("calcSlider");
  if (slider) {
    var CO2_PER_PHONE = 55;   // kg CO2e avoided vs. manufacturing new (estimate)
    var KG_PER_PHONE = 0.16;  // avg phone weight diverted from waste stream (kg)
    var PEOPLE_PER_PHONE = 1; // one device ≈ one person/family connected

    function fmt(n) {
      if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
      if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
      return Math.round(n).toLocaleString();
    }
    function update() {
      var phones = parseInt(slider.value, 10);
      document.getElementById("calcPhones").firstChild.textContent = phones.toLocaleString();
      var co2 = phones * CO2_PER_PHONE / 1000; // tonnes
      var waste = phones * KG_PER_PHONE / 1000; // tonnes
      var people = phones * PEOPLE_PER_PHONE;
      document.getElementById("resCo2").textContent = fmt(co2) + " t";
      document.getElementById("resWaste").textContent = fmt(waste) + " t";
      document.getElementById("resPeople").textContent = fmt(people);
      document.querySelectorAll(".preset").forEach(function (p) {
        p.classList.toggle("active", parseInt(p.dataset.val, 10) === phones);
      });
    }
    slider.addEventListener("input", update);
    document.querySelectorAll(".preset").forEach(function (p) {
      p.addEventListener("click", function () {
        slider.value = p.dataset.val;
        update();
      });
    });
    update();
  }

  /* ---- Contact form (progressive enhancement over Formspree) ---- */
  var form = document.getElementById("partnerForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      var endpoint = form.getAttribute("action") || "";
      var msgOk = form.querySelector(".form-msg.is-ok");
      var msgErr = form.querySelector(".form-msg.is-err");
      var btn = form.querySelector("button[type=submit]");
      // If no real endpoint is configured yet, simulate success for demo/preview.
      var configured = endpoint && endpoint.indexOf("YOUR_FORM_ID") === -1 && endpoint.indexOf("#") !== 0;
      if (!configured) {
        ev.preventDefault();
        if (btn) btn.style.display = "none";
        if (msgOk) msgOk.classList.add("ok");
        return;
      }
      // Real submit via fetch so the user stays on-page.
      ev.preventDefault();
      var data = new FormData(form);
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (btn) btn.style.display = "none";
            if (msgErr) msgErr.classList.remove("err");
            if (msgOk) msgOk.classList.add("ok");
          } else { throw new Error("bad response"); }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Request Partnership Info"; }
          if (msgErr) msgErr.classList.add("err");
        });
    });
  }

  /* ---- Video placeholder click (no-op until embed added) ---- */
  var vp = document.getElementById("videoSlot");
  if (vp) vp.addEventListener("click", function () {
    /* Replace #videoSlot markup with a <video> or <iframe> to go live. */
  });
})();
