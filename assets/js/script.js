/**
 * A-ONE BEAUTY PARLOUR - MAIN JAVASCRIPT
 * Fully accessible, performant, smooth scroll, hamburger toggle & lightbox modal.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. Sticky Header Shadow on Scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Active Nav Link Highlighter on Scroll
  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav-list a[href*="#${sectionId}"]`,
      );

      if (correspondingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingNavLink.classList.add("active");
        } else {
          correspondingNavLink.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);

  // 4. Reveal-on-Scroll & Parallax Motion
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-fade, .reveal-scale",
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealEls.forEach((element) => revealObserver.observe(element));
  } else {
    revealEls.forEach((element) => element.classList.add("active"));
  }

  // 5. Gallery Lightbox Functionality
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector(".gallery-img");
        const title = item.querySelector(".gallery-title");

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || "Gallery Image";
          lightboxCaption.textContent = title ? title.textContent : "";
          lightbox.classList.add("active");
          lightbox.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden"; // Lock background scrolling
        }
      });
    });

    const closeLightboxModal = () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightboxModal);
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightboxModal();
      }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightboxModal();
      }
    });
  }
});
