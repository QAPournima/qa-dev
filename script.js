(function () {
  var html = document.documentElement;
  var stage = document.querySelector("[data-stage]");
  var face = document.querySelector("[data-face]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wideMq = window.matchMedia("(min-width: 861px)");
  var spot = document.querySelector(".mouse-spot");

  function setSplit(pct, rest) {
    if (!stage) return;
    stage.style.setProperty("--split", pct);
    stage.classList.toggle("is-rest", !!rest);
  }

  function sizeFace() {
    if (!face) return;
    face.style.setProperty("--face-w", face.offsetWidth + "px");
  }

  function reset() {
    setSplit(50, true);
  }

  function fromMouse(clientX) {
    if (!stage || !face || !wideMq.matches || reduce) {
      reset();
      return;
    }
    var box = face.getBoundingClientRect();
    if (clientX < box.left) {
      setSplit(88, false);
      return;
    }
    if (clientX > box.right) {
      setSplit(12, false);
      return;
    }
    var t = (clientX - box.left) / box.width;
    setSplit(Math.round((t * 84 + 8) * 10) / 10, false);
  }

  function lean(mode) {
    if (!wideMq.matches || reduce) {
      reset();
      return;
    }
    if (mode === "qa") setSplit(88, false);
    else if (mode === "dev") setSplit(12, false);
    else reset();
  }

  if (stage && face) {
    var qa = stage.querySelector('[data-lean="qa"]');
    var dev = stage.querySelector('[data-lean="dev"]');
    stage.addEventListener("pointermove", function (e) { fromMouse(e.clientX); });
    stage.addEventListener("pointerleave", reset);
    if (qa) {
      qa.addEventListener("focus", function () { lean("qa"); });
      qa.addEventListener("blur", reset);
    }
    if (dev) {
      dev.addEventListener("focus", function () { lean("dev"); });
      dev.addEventListener("blur", reset);
    }
    wideMq.addEventListener("change", function () {
      sizeFace();
      reset();
    });
    window.addEventListener("resize", sizeFace);
    sizeFace();
    reset();
  }

  window.addEventListener("pointermove", function (e) {
    if (!spot) return;
    if (reduce) {
      spot.style.opacity = "0";
      return;
    }
    spot.style.opacity = "1";
    spot.style.background =
      "radial-gradient(600px circle at " +
      e.clientX +
      "px " +
      e.clientY +
      "px, color-mix(in srgb, var(--tone) 26%, transparent), transparent 80%)";
    var card = e.target.closest(".door, .card, .panel, .frame, .write-card");
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--lx", e.clientX - r.left + "px");
    card.style.setProperty("--ly", e.clientY - r.top + "px");
  }, { passive: true });
})();
