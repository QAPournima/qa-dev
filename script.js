(function () {
  var stage = document.querySelector("[data-stage]");
  if (!stage) return;
  var qa = stage.querySelector('[data-lean="qa"]');
  var dev = stage.querySelector('[data-lean="dev"]');
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wide = window.matchMedia("(min-width: 861px)").matches;

  function lean(mode) {
    qa.setAttribute("aria-pressed", mode === "qa" ? "true" : "false");
    dev.setAttribute("aria-pressed", mode === "dev" ? "true" : "false");
    if (!wide || reduce) {
      stage.style.setProperty("--split", "50%");
      return;
    }
    if (mode === "qa") stage.style.setProperty("--split", "68%");
    else if (mode === "dev") stage.style.setProperty("--split", "32%");
    else stage.style.setProperty("--split", "50%");
  }

  qa.addEventListener("mouseenter", function () { lean("qa"); });
  qa.addEventListener("focus", function () { lean("qa"); });
  dev.addEventListener("mouseenter", function () { lean("dev"); });
  dev.addEventListener("focus", function () { lean("dev"); });
  stage.addEventListener("mouseleave", function () { lean(""); });

  qa.addEventListener("click", function () {
    window.location.href = "https://qapournima.github.io/ai-quality-engineering/journey.html";
  });
  dev.addEventListener("click", function () {
    window.location.href = "https://qapournima.github.io/ai-quality-engineering/fame.html";
  });
})();
