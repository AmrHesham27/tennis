document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("searchToggle");
  const searchExpanded = document.getElementById("searchExpanded");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const blogsDropdown = document.getElementById("blogsDropdown");
  const blogsLink = document.querySelector('.blogs-nav-link');
  const mobileBlogsSubmenu = document.getElementById("mobileBlogsSubmenu");

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

  // Blogs dropdown functionality
  let isMobile = window.innerWidth <= 767;
  
  if (blogsLink && blogsDropdown) {
    let dropdownTimeout;

    // Function to check if mobile
    function checkMobile() {
      isMobile = window.innerWidth <= 767;
    }

    // Desktop hover functionality
    function setupDesktopEvents() {
      blogsLink.addEventListener("mouseenter", function () {
        if (!isMobile) {
          clearTimeout(dropdownTimeout);
          blogsDropdown.classList.add("active");
          blogsLink.classList.add("active");
        }
      });

      blogsLink.addEventListener("mouseleave", function () {
        if (!isMobile) {
          dropdownTimeout = setTimeout(() => {
            blogsDropdown.classList.remove("active");
            blogsLink.classList.remove("active");
          }, 200);
        }
      });

      blogsDropdown.addEventListener("mouseenter", function () {
        if (!isMobile) {
          clearTimeout(dropdownTimeout);
        }
      });

      blogsDropdown.addEventListener("mouseleave", function () {
        if (!isMobile) {
          dropdownTimeout = setTimeout(() => {
            blogsDropdown.classList.remove("active");
            blogsLink.classList.remove("active");
          }, 200);
        }
      });
    }

    // Mobile click functionality
    function setupMobileEvents() {
      blogsLink.addEventListener("click", function (e) {
        if (isMobile) {
          e.preventDefault();
          mobileBlogsSubmenu.classList.toggle("active");
          blogsLink.classList.toggle("active");
        }
      });
    }

    // Initialize events
    setupDesktopEvents();
    setupMobileEvents();

    // Update mobile state on resize
    window.addEventListener("resize", function () {
      checkMobile();
      isMobile = window.innerWidth <= 767;
    });
  }

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Don't close menu if it's the blogs link on mobile
      if (!(isMobile && link.classList.contains('blogs-nav-link'))) {
        mainNav.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
  });

  // Close mobile submenu when clicking on submenu links
  const submenuLinks = document.querySelectorAll(".submenu-link");
  submenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileBlogsSubmenu.classList.remove("active");
      blogsLink.classList.remove("active");
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

    // Close blogs dropdown on escape key
    if (e.key === "Escape" && blogsDropdown.classList.contains("active")) {
      blogsDropdown.classList.remove("active");
      blogsLink.classList.remove("active");
    }

    // Close mobile blogs submenu on escape key
    if (e.key === "Escape" && mobileBlogsSubmenu.classList.contains("active")) {
      mobileBlogsSubmenu.classList.remove("active");
      blogsLink.classList.remove("active");
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

    // Close blogs dropdown when clicking outside
    if (
      !blogsDropdown.contains(e.target) &&
      !blogsLink.contains(e.target) &&
      blogsDropdown.classList.contains("active")
    ) {
      // On mobile, only close if not clicking on the blogs link itself
      if (!isMobile || !blogsLink.contains(e.target)) {
        blogsDropdown.classList.remove("active");
        blogsLink.classList.remove("active");
      }
    }

    // Close mobile blogs submenu when clicking outside
    if (
      !mobileBlogsSubmenu.contains(e.target) &&
      !blogsLink.contains(e.target) &&
      mobileBlogsSubmenu.classList.contains("active")
    ) {
      mobileBlogsSubmenu.classList.remove("active");
      blogsLink.classList.remove("active");
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
    // Update mobile state and handle blogs dropdown
    isMobile = window.innerWidth <= 767;
    if (isMobile) {
      blogsDropdown.classList.remove("active");
      blogsLink.classList.remove("active");
    } else {
      // Close mobile submenu when switching to desktop
      mobileBlogsSubmenu.classList.remove("active");
      blogsLink.classList.remove("active");
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
