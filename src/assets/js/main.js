/* A-XS — interface behaviour. No dependencies, no tracking. */
(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;

  root.classList.add("js");

  /* Theme ---------------------------------------------------------------- */

  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function currentTheme() {
    return root.dataset.theme === "paper" ? "paper" : "ink";
  }

  function syncThemeButton() {
    if (!themeToggle) return;
    const isPaper = currentTheme() === "paper";
    themeToggle.setAttribute("aria-pressed", String(isPaper));
    themeToggle.setAttribute(
      "aria-label",
      isPaper ? "Switch to ink mode" : "Switch to paper mode",
    );
    if (themeMeta) {
      themeMeta.setAttribute("content", isPaper ? "#efe8db" : "#080706");
    }
  }

  syncThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = currentTheme() === "paper" ? "ink" : "paper";
      if (next === "paper") {
        root.dataset.theme = "paper";
      } else {
        delete root.dataset.theme;
      }
      try {
        localStorage.setItem("axs-theme", next);
      } catch (error) {}
      syncThemeButton();
    });
  }

  /* Clock ---------------------------------------------------------------- */

  const clock = document.querySelector("[data-clock-time]");
  const timeZone = "Africa/Algiers";

  function setClock() {
    if (!clock) return;
    try {
      clock.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    } catch (error) {
      clock.textContent = "";
    }
  }

  setClock();
  if (clock) window.setInterval(setClock, 30000);

  /* Mobile menu ---------------------------------------------------------- */

  const menu = document.querySelector("[data-mobile-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuClose = document.querySelector("[data-menu-close]");
  let lastFocused = null;

  function menuIsOpen() {
    return menu && menu.classList.contains("is-open");
  }

  function openMenu() {
    if (!menu || !menuToggle) return;
    lastFocused = document.activeElement;
    menuToggle.setAttribute("aria-expanded", "true");
    menu.removeAttribute("inert");
    menu.setAttribute("aria-hidden", "false");
    menu.classList.add("is-open");
    body.classList.add("menu-open");
    window.setTimeout(function () {
      if (menuClose) menuClose.focus();
    }, 30);
  }

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("inert", "");
    menu.setAttribute("aria-hidden", "true");
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    } else {
      menuToggle.focus();
    }
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      if (menuIsOpen()) closeMenu();
      else openMenu();
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (menu) {
    menu.addEventListener("click", function (event) {
      const link = event.target.closest("a");
      if (link) closeMenu();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!menuIsOpen()) return;
    if (event.key === "Escape") {
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      menu.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(function (element) {
      return element.offsetParent !== null;
    });

    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 961px)");
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", function (event) {
      if (event.matches && menuIsOpen()) closeMenu();
    });
  }

  /* Scroll rule ---------------------------------------------------------- */

  const scrollRule = document.querySelector("[data-scroll-rule]");
  let scrollFrame = 0;

  function updateScrollRule() {
    scrollFrame = 0;
    if (!scrollRule) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    scrollRule.style.setProperty("--scroll", progress.toFixed(4));
  }

  function requestScrollRule() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollRule);
  }

  updateScrollRule();
  window.addEventListener("scroll", requestScrollRule, { passive: true });
  window.addEventListener("resize", requestScrollRule, { passive: true });

  /* Reveal --------------------------------------------------------------- */

  const revealItems = document.querySelectorAll("[data-reveal]");

  if (revealItems.length) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("reveal");
      });
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    }
  }

  /* Copy the current year into any data-year element ---------------------- */

  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getUTCFullYear());
  });
})();
