
/* =========================================
   SASI PORTFOLIO — INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. AUTOMATIC FOOTER YEAR
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // 3. PROJECT FILTERS
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const projectCount = document.getElementById("project-count");

  function filterProjects(category) {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const matches =
        category === "all" ||
        card.dataset.category === category;

      card.classList.toggle("is-hidden", !matches);

      if (matches) {
        visibleCount++;

        // Replay a small entrance animation when filtering.
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "";
      }
    });

    if (projectCount) {
      const categoryName = {
        all: "all projects",
        graphic: "graphic design projects",
        web: "web development projects"
      };

      projectCount.textContent =
        `Showing ${visibleCount} ${categoryName[category]}.`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        const selected = item === button;

        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      filterProjects(selectedCategory);
    });
  });

  // 4. PROJECT DETAIL CONTENT
  const projectDetails = {
    coffee: {
      category: "GRAPHIC DESIGN · BRAND IDENTITY",
      title: "Mellow Coffee Co.",
      description:
        "A fictional specialty coffee brand exploring logo direction, packaging, warm colors, typography and a consistent visual identity across touchpoints.",
      note:
        "Next step: create original logo files, packaging mockups, a color palette and a short brand guideline."
    },

    poster: {
      category: "GRAPHIC DESIGN · POSTER",
      title: "Take the Scenic Route",
      description:
        "A travel-inspired poster concept using bold headlines, contrasting type styles and a playful layout to communicate a sense of adventure.",
      note:
        "Next step: develop print-ready artwork, refine typography and prepare a few presentation mockups."
    },

    logos: {
      category: "GRAPHIC DESIGN · LOGO COLLECTION",
      title: "Little Marks, Big Ideas",
      description:
        "A collection of four fictional brand identities. Each direction experiments with a different personality, symbol, wordmark and color combination.",
      note:
        "Next step: develop each mark as original vector artwork and document the reasoning behind the design."
    },

    instapost: {
      category: "GRAPHIC DESIGN · SOCIAL MEDIA",
      title: "A Feed Worth Sipping",
      description:
        "An Instagram post concept for Mellow Coffee Co. The design explores readable messaging, consistent branding and a warm café aesthetic.",
      note:
        "Next step: produce a final 1080 × 1080 design and create companion posts for a cohesive social feed."
    },

    instastory: {
      category: "GRAPHIC DESIGN · INSTAGRAM STORY",
      title: "Stories in a Sip",
      description:
        "A vertical social media story concept combining bold typography, a short message and a clear call to action.",
      note:
        "Next step: create the final 1080 × 1920 artwork and a sequence of stories for a mini campaign."
    },

    campaign: {
      category: "GRAPHIC DESIGN · TRAVEL CAMPAIGN",
      title: "Somewhere, Slowly",
      description:
        "A fictional travel campaign built around slower weekends, nature and discovering places at your own pace. It connects poster design with digital campaign visuals.",
      note:
        "Next step: extend the concept into a campaign poster, social posts and a destination landing-page design."
    },

    budget: {
      category: "FRONT-END · TRAVEL BUDGET PLANNER",
      title: "Little Escape — Budget Planner",
      description:
        "A proposed interactive planner where visitors choose a destination, number of days, group size and spending preferences. JavaScript can calculate an illustrative budget across travel, accommodation, food and activities.",
      note:
        "This portfolio card is a visual concept, not a functioning travel calculator yet. Build the actual planner as a separate working demo."
    },

    hotels: {
      category: "FRONT-END · HOTEL DISCOVERY",
      title: "Stay a Little Longer",
      description:
        "A proposed hotel discovery interface featuring property cards, nightly price ranges, accommodation filters and clear stay information.",
      note:
        "Use sample properties and clearly labelled illustrative prices until you connect verified hotel data. No booking service is implemented here."
    },

    itinerary: {
      category: "FRONT-END · TRAVEL ITINERARY",
      title: "Get There, Gently",
      description:
        "A travel itinerary interface concept for organizing daily activities, arrival details, transport notes and destination highlights into one readable plan.",
      note:
        "The next development step is to let visitors add, edit and reorder itinerary stops with JavaScript."
    },

    travelhub: {
      category: "FRONT-END · TOURISM WEBSITE",
      title: "Little Escape — Travel Hub",
      description:
        "A proposed tourism website that brings together trip preferences, budget planning, accommodation discovery, transport information and destination itineraries.",
      note:
        "This is a concept preview. Turn it into a complete responsive website and connect its individual features as separate interactive components."
    }
  };

  const dialog = document.getElementById("project-dialog");
  const dialogCategory = document.getElementById("dialog-category");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");
  const dialogNote = document.getElementById("dialog-note");
  const dialogClose = document.querySelector(".dialog-close");
  const dialogDone = document.querySelector(".dialog-done");

  function openProject(projectKey, trigger) {
    const project = projectDetails[projectKey];

    if (!project || !dialog) return;

    dialogCategory.textContent = project.category;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogNote.textContent = project.note;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      dialog.dataset.trigger = projectKey;
      dialog._lastTrigger = trigger;
    }
  }

  document.querySelectorAll(".project-open[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      openProject(button.dataset.project, button);
    });
  });

  function closeProjectDialog() {
    if (dialog?.open) {
      dialog.close();
    }
  }

  dialogClose?.addEventListener("click", closeProjectDialog);
  dialogDone?.addEventListener("click", closeProjectDialog);

  // Clicking the backdrop closes the dialog.
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeProjectDialog();
    }
  });

  // Return keyboard focus to the button that opened the dialog.
  dialog?.addEventListener("close", () => {
    dialog._lastTrigger?.focus();
  });

  // 5. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // 6. INITIAL PROJECT COUNT
  filterProjects("all");
});

