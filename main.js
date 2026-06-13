/* Star Electrical — interactions */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Intro overlay */
  window.addEventListener("load", function () {
    var intro = document.getElementById("intro");
    if (!intro) return;
    setTimeout(function () { intro.classList.add("hide"); }, reduce ? 200 : 1100);
  });

  document.addEventListener("DOMContentLoaded", function () {
    /* Nav scroll state */
    var nav = document.querySelector(".nav");
    function onScroll() {
      if (!nav) return;
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Mobile menu */
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
        toggle.textContent = links.classList.contains("open") ? "✕" : "☰";
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); toggle.textContent = "☰"; });
      });
    }

    /* Hero rolling slides */
    var slides = document.querySelectorAll(".hero-slide");
    if (slides.length > 1 && !reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
      }, 6000);
    }

    /* Reveal on scroll */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.14 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* Footer year */
    var y = document.getElementById("yr");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
