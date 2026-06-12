(() => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function setupHoverMenus() {
    document.querySelectorAll(".tool-menu").forEach((menu) => {
      const summary = menu.querySelector("summary");

      summary?.addEventListener("click", (event) => {
        if (finePointer.matches) {
          event.preventDefault();
        }
      });

      menu.addEventListener("mouseenter", () => {
        if (finePointer.matches) {
          menu.setAttribute("open", "");
        }
      });

      menu.addEventListener("mouseleave", () => {
        if (finePointer.matches) {
          menu.removeAttribute("open");
        }
      });
    });
  }

  function setupCustomCursor() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.documentElement.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    const moveDot = () => {
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      moveDot();
    });

    const interactiveSelector = "a, button, summary, .tool-card, .category-card, .exact-upload, input[type='file'], select";
    const textSelector = "input:not([type='file']), textarea";

    document.addEventListener("mouseover", (event) => {
      if (event.target.closest(interactiveSelector)) {
        document.documentElement.classList.add("cursor-active");
      }
      if (event.target.closest(textSelector)) {
        document.documentElement.classList.add("cursor-text");
      }
    });

    document.addEventListener("mouseout", (event) => {
      if (event.target.closest(interactiveSelector)) {
        document.documentElement.classList.remove("cursor-active");
      }
      if (event.target.closest(textSelector)) {
        document.documentElement.classList.remove("cursor-text");
      }
    });

    window.addEventListener("mouseleave", () => document.documentElement.classList.add("cursor-hidden"));
    window.addEventListener("mouseenter", () => document.documentElement.classList.remove("cursor-hidden"));

    moveDot();
    animateRing();
  }

  setupHoverMenus();
  setupCustomCursor();
})();
