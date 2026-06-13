(() => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function setupHoverMenus() {
    document.querySelectorAll(".tool-menu").forEach((menu) => {
      const summary = menu.querySelector("summary");
      let closeTimer;

      const openMenu = () => {
        clearTimeout(closeTimer);
        menu.setAttribute("open", "");
      };

      const closeMenu = () => {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => menu.removeAttribute("open"), 220);
      };

      summary?.addEventListener("click", (event) => {
        if (finePointer.matches) {
          event.preventDefault();
        }
      });

      menu.addEventListener("mouseenter", () => {
        if (finePointer.matches) {
          openMenu();
        }
      });

      menu.addEventListener("mouseleave", () => {
        if (finePointer.matches) {
          closeMenu();
        }
      });

      menu.addEventListener("focusin", () => {
        if (finePointer.matches) {
          openMenu();
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
    const contrastSelector = ".brand-mark, .eyebrow, .tool-result, .primary-auth, .button.primary";

    const updateCursorState = (event) => {
      const target = event.target;
      const isInteractive = !!target.closest(interactiveSelector);
      document.documentElement.classList.toggle("cursor-active", isInteractive);
      document.documentElement.classList.toggle("cursor-text", !!target.closest(textSelector));
      document.documentElement.classList.toggle("cursor-contrast", !isInteractive && needsContrastCursor(target, contrastSelector));
    };

    document.addEventListener("mouseover", (event) => {
      if (event.target.closest(interactiveSelector)) {
        document.documentElement.classList.add("cursor-active");
      }
      if (event.target.closest(textSelector)) {
        document.documentElement.classList.add("cursor-text");
      }
      updateCursorState(event);
    });

    document.addEventListener("mouseout", (event) => {
      if (event.target.closest(interactiveSelector)) {
        document.documentElement.classList.remove("cursor-active");
      }
      if (event.target.closest(textSelector)) {
        document.documentElement.classList.remove("cursor-text");
      }
      document.documentElement.classList.remove("cursor-contrast");
    });

    window.addEventListener("mousemove", updateCursorState);

    window.addEventListener("mouseleave", () => document.documentElement.classList.add("cursor-hidden"));
    window.addEventListener("mouseenter", () => document.documentElement.classList.remove("cursor-hidden"));

    moveDot();
    animateRing();
  }

  function needsContrastCursor(target, selector) {
    if (!target?.closest) return false;
    if (target.closest(selector)) return true;
    let element = target.nodeType === Node.ELEMENT_NODE ? target : target.parentElement;
    for (let depth = 0; element && depth < 4; depth += 1, element = element.parentElement) {
      const style = window.getComputedStyle(element);
      if (isTealLike(style.color) || isTealLike(style.backgroundColor)) return true;
    }
    return false;
  }

  function isTealLike(value) {
    const match = value.match(/rgba?\((\d+),\\s*(\d+),\\s*(\d+)/);
    if (!match) return false;
    const [, r, g, b] = match.map(Number);
    return g > 80 && b > 80 && g >= r * 1.4 && b >= r * 1.4;
  }

  setupHoverMenus();
  setupCustomCursor();
})();
