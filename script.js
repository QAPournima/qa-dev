(function () {
  var stage = document.querySelector("[data-stage]");
  var face = document.querySelector("[data-face]");
  if (!stage || !face) return;
  var qa = stage.querySelector('[data-lean="qa"]');
  var dev = stage.querySelector('[data-lean="dev"]');
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wideMq = window.matchMedia("(min-width: 861px)");

  function setSplit(pct, rest) {
    stage.style.setProperty("--split", pct + "%");
    stage.classList.toggle("is-rest", !!rest);
  }

  function reset() {
    setSplit(50, true);
  }

  function fromMouse(clientX) {
    if (!wideMq.matches || reduce) {
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
    var pct = Math.round((t * 84 + 8) * 10) / 10;
    setSplit(pct, false);
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

  stage.addEventListener("pointermove", function (e) {
    fromMouse(e.clientX);
  });
  stage.addEventListener("pointerleave", reset);
  qa.addEventListener("focus", function () { lean("qa"); });
  dev.addEventListener("focus", function () { lean("dev"); });
  qa.addEventListener("blur", reset);
  dev.addEventListener("blur", reset);
  wideMq.addEventListener("change", reset);
  reset();
})();
