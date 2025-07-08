document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("searchToggle");
  const searchExpanded = document.getElementById("searchExpanded");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");

  // Toggle search expansion
  searchToggle.addEventListener("click", function () {
    searchExpanded.classList.add("active");
    searchInput.focus();
  });

  // Close search
  searchClose.addEventListener("click", function () {
    searchExpanded.classList.remove("active");
    searchInput.value = "";
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    });
  });

  // Close search on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && searchExpanded.classList.contains("active")) {
      searchExpanded.classList.remove("active");
      searchInput.value = "";
    }

    // Close mobile menu on escape key
    if (e.key === "Escape" && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    }
  });

  // Handle search input
  searchInput.addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase();
    // Add your search logic here
    console.log("Searching for:", query);
  });

  // Close search when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !searchExpanded.contains(e.target) &&
      !searchToggle.contains(e.target) &&
      searchExpanded.classList.contains("active")
    ) {
      searchExpanded.classList.remove("active");
      searchInput.value = "";
    }

    // Close mobile menu when clicking outside
    if (
      !mainNav.contains(e.target) &&
      !mobileMenuToggle.contains(e.target) &&
      mainNav.classList.contains("active")
    ) {
      mainNav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    }
  });

  // Handle window resize to close mobile menu on larger screens
  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) {
      mainNav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    }
  });

  // Author link
  document.querySelectorAll(".author-link").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.href = el.dataset.href;
    });

    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        window.location.href = el.dataset.href;
      }
    });
  });

  // Testimonials Section
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.next-btn',
      prevEl: '.prev-btn',
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
  
});
