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

  // Cookie Consent Functionality
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookies = document.getElementById("acceptCookies");
  const declineCookies = document.getElementById("declineCookies");

  // Check if user has already made a choice
  function hasUserConsented() {
    return localStorage.getItem('cookieConsent') !== null;
  }

  // Show cookie consent if user hasn't made a choice
  function showCookieConsent() {
    
    // Try to find the element again in case it wasn't found initially
    const cookieConsentElement = document.getElementById("cookieConsent");
    
    if (!hasUserConsented() && cookieConsentElement) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        cookieConsentElement.classList.add('show');
      }, 1000);
    } else {
      console.log('Cookie consent will not show - already consented or element not found');
    }
  }

  // Handle cookie acceptance
  function acceptCookieConsent() {
    hideCookieConsent();
    // Here you can add analytics tracking or other cookie-dependent functionality
  }

  // Handle cookie decline
  function declineCookieConsent() {
    hideCookieConsent();
    // Here you can disable analytics tracking or other cookie-dependent functionality
  }

  // Hide cookie consent
  function hideCookieConsent() {
    const cookieConsentElement = document.getElementById("cookieConsent");
    if (cookieConsentElement) {
      cookieConsentElement.classList.remove('show');
    }
  }

  // Add event listeners for cookie buttons
  if (acceptCookies) {
    acceptCookies.addEventListener('click', acceptCookieConsent);
  }

  if (declineCookies) {
    declineCookies.addEventListener('click', declineCookieConsent);
  }

  // Show cookie consent on page load
  showCookieConsent();
  
  // Temporary: Force show cookie consent for testing
  setTimeout(() => {
    const testElement = document.getElementById("cookieConsent");
    if (testElement) {
      testElement.classList.add('show');
    }
  }, 2000);

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
});
