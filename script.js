// Dark Mode Toggle
function initDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  const themeSwitchLabel = document.getElementById('themeSwitchLabel');
  const body = document.body;

  if (themeToggle) {
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  }

  // Place the theme switch inside the mobile menu on mobile
  const switchWrapper = document.querySelector('.theme-switch-wrapper');
  const navEl = document.querySelector('nav');
  const mobileMenuList = document.querySelector('#mobileMenu ul');

  function applyTogglePlacement() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!switchWrapper) return;
    if (isMobile) {
      if (mobileMenuList) {
        // Wrap the switch in a list item for menu styling
        let li = mobileMenuList.querySelector('li.theme-switch-item');
        if (!li) {
          li = document.createElement('li');
          li.className = 'theme-switch-item';
          mobileMenuList.appendChild(li);
        }
        if (switchWrapper && switchWrapper.parentElement !== li) {
          li.appendChild(switchWrapper);
        }
        // Make sure label is visible in menu context
        if (themeSwitchLabel) themeSwitchLabel.style.display = 'inline';
      }
      // Clear any floating/inline styles from earlier logic
      if (switchWrapper) {
        switchWrapper.classList.remove('floating');
        Object.assign(switchWrapper.style, { position: '', right: '', left: '', top: '', bottom: '' });
      }
    } else {
      // Attach back to nav (end) for desktop
      if (navEl && switchWrapper && switchWrapper.parentElement !== navEl) {
        navEl.appendChild(switchWrapper);
      }
      if (themeSwitchLabel) themeSwitchLabel.style.display = '';
    }
  }

  // Initial placement and on changes
  applyTogglePlacement();
  window.addEventListener('resize', applyTogglePlacement);
  if (window.matchMedia) {
    window.matchMedia('(max-width: 768px)').addEventListener('change', applyTogglePlacement);
  }

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
    themeSwitchLabel.textContent = 'Turn on the lights?';
  }

  // Toggle theme on checkbox change
  themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');

    // Update label text and localStorage
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      themeSwitchLabel.textContent = 'Turn on the lights?';
    } else {
      localStorage.setItem('theme', 'light');
      themeSwitchLabel.textContent = 'Turn off the lights?';
    }
  });
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initDarkMode);

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");

  mobileMenu.classList.toggle("active");
  hamburgerIcon.classList.toggle("active");
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");

  mobileMenu.classList.remove("active");
  hamburgerIcon.classList.remove("active");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
    closeMobileMenu();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
    }
  });
}, observerOptions);

// Observe all sections and cards for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    "section, .skill-category, .experience-item, .project-card"
  );
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });

  // Initialize animated stats counter
  initStatsCounter();

  // Initialize typing animation
  initTypingAnimation();

  // Initialize interactive timeline
  initInteractiveTimeline();

  // Initialize back to top button
  initBackToTop();

  // Initialize availability badge
  initAvailabilityBadge();

  // Initialize interactive profile photo
  initProfilePhotoInteraction();
});

// Add loading state and smooth transitions
document.addEventListener("DOMContentLoaded", function () {
  // Add loaded class to body for any CSS transitions
  document.body.classList.add("loaded");

  // Initialize any additional interactive features
  initializeInteractiveFeatures();
});

function initializeInteractiveFeatures() {
  // Interactive features can be added here if needed
  // Currently using CSS hover effects which are more performant
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    closeMobileMenu();
  }

  // Navigate through sections with arrow keys (optional enhancement)
  if (e.altKey) {
    const sections = ["home", "testimonials", "skills", "experience", "projects", "contact"];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);

    if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
      document.getElementById(sections[currentIndex + 1]).scrollIntoView({
        behavior: "smooth",
      });
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
      document.getElementById(sections[currentIndex - 1]).scrollIntoView({
        behavior: "smooth",
      });
    }
  }
});

function getCurrentSection() {
  const sections = document.querySelectorAll("section[id]");
  let currentSection = "home";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom > 100) {
      currentSection = section.id;
    }
  });

  return currentSection;
}

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

// Availability Badge Control
function initAvailabilityBadge() {
  const availabilityStatus = document.body.getAttribute('data-availability');
  const badge = document.querySelector('.availability-badge');

  if (!badge) return;

  if (availabilityStatus === 'unavailable') {
    // Change to amber/yellow "open to offers" styling
    badge.classList.add('unavailable');
    badge.querySelector('.status-text').textContent = 'Currently booked. You can still reach out though!';
    badge.querySelector('.status-dot').style.background = '#f59e0b';
    badge.style.background = 'rgba(245, 158, 11, 0.1)';
    badge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
  } else {
    // Keep available styling (already set in HTML/CSS)
    badge.classList.add('available');
  }
}

// Interactive Profile Photo with Multiple Reactions
function initProfilePhotoInteraction() {
  const profilePhoto = document.querySelector('.profile-photo');
  const profileImg = document.querySelector('.profile-img');
  const speechBubble = document.querySelector('.speech-bubble');

  if (!profilePhoto || !profileImg || !speechBubble) return;

  const reactions = [
    '😠 Hey, who put me here?',
    '😵 Stop poking me!',
    '😅 Again? Really?',
    '🤔 What do you want?',
    '😤 I\'m trying to look professional!',
    '🙄 Not this again...',
    '😆 That tickles!',
    '🤨 Can I help you?',
    '😎 I\'m kind of a big deal',
    '🥱 This is getting old...'
  ];

  let currentReactionIndex = 0;

  profilePhoto.addEventListener('click', () => {
    // Remove hint class on first click
    speechBubble.classList.remove('hint');

    // Add shake animation to image
    profileImg.classList.add('shake');

    // Change speech bubble text
    currentReactionIndex = Math.floor(Math.random() * reactions.length);
    speechBubble.textContent = reactions[currentReactionIndex];

    // Show speech bubble
    speechBubble.classList.add('show');

    // Remove shake animation after it completes
    setTimeout(() => {
      profileImg.classList.remove('shake');
    }, 500);

    // Hide speech bubble after 3 seconds
    setTimeout(() => {
      speechBubble.classList.remove('show');
    }, 3000);
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  // Show/hide based on scroll position
  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, 100));

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Interactive Experience Timeline
function initInteractiveTimeline() {
  const experienceItems = document.querySelectorAll('.experience-item');

  experienceItems.forEach((item, index) => {
    const content = item.querySelector('.experience-content');
    const achievements = item.querySelector('.achievements');

    if (!content || !achievements) return;

    // Create toggle button with cheeky text
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'timeline-toggle';
    toggleBtn.innerHTML = '<span class="toggle-text">The Boring Details</span><i class="fas fa-chevron-down"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle experience details');
    toggleBtn.setAttribute('aria-expanded', 'true');

    // Insert button at the end of content (bottom center)
    content.appendChild(toggleBtn);

    // Extract year from duration and add year label
    const duration = item.querySelector('.duration');
    if (duration) {
      const durationText = duration.textContent;
      const yearMatch = durationText.match(/\b(20\d{2})/); // Match year starting with 20

      if (yearMatch) {
        const year = yearMatch[1];
        const yearLabel = document.createElement('div');
        yearLabel.className = 'timeline-year';
        yearLabel.textContent = year;
        item.appendChild(yearLabel);
      }
    }

    // Add "current" badge to first item (current job)
    if (index === 0) {
      const currentBadge = document.createElement('div');
      currentBadge.className = 'current-job-badge';
      currentBadge.innerHTML = '<i class="fas fa-briefcase"></i> CURRENT';
      content.insertBefore(currentBadge, content.firstChild);
      item.classList.add('current-job');
    }

    // Collapse all except first one
    if (index !== 0) {
      item.classList.add('collapsed');
      toggleBtn.classList.add('collapsed');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    // Toggle on click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = item.classList.toggle('collapsed');
      toggleBtn.classList.toggle('collapsed');
      toggleBtn.setAttribute('aria-expanded', !isCollapsed);
    });
  });
}

// Typing Animation for Subtitle
function initTypingAnimation() {
  const subtitle = document.querySelector('.subtitle');
  if (!subtitle) return;

  const texts = [
    'Computer Engineer',
    'Product Specialist',
    'Web Developer',
    'Problem Solver'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      subtitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      subtitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Add blinking cursor
    subtitle.innerHTML = subtitle.textContent + '<span class="typing-cursor">|</span>';

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing animation after a short delay
  setTimeout(type, 1000);
}

// Animated Stats Counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const animateCounter = (element) => {
    const target = element.textContent.trim();
    const isPercentage = target.includes('%');
    const hasPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));

    if (isNaN(numericValue)) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      current += increment;
      step++;

      if (step >= steps) {
        current = numericValue;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (isPercentage) displayValue += '%';
      if (hasPlus) displayValue += '+';

      element.textContent = displayValue;
    }, duration / steps);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach((stat, index) => {
          setTimeout(() => animateCounter(stat), index * 100);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Header background change - use class instead of inline styles
  const header = document.querySelector("header");

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Update active navigation
  const currentSection = getCurrentSection();
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);

// Enhanced Contact Form with Formspree Integration

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
    addFormValidation();
  }
});

async function handleFormSubmit(e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector(".form-submit-btn");
  const originalText = submitBtn.innerHTML;

  // Simple validation check
  const requiredFields = e.target.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let hasErrors = false;

  requiredFields.forEach((field) => {
    const value = field.value.trim();
    if (!value || (field.tagName === "SELECT" && value === "")) {
      showFieldError(field, "This field is required");
      field.style.borderColor = "#e74c3c";
      hasErrors = true;
    } else {
      clearFieldValidation(field);
      field.style.borderColor = "#27ae60";
    }
  });

  if (hasErrors) {
    showNotification(
      "Please fill in all required fields before submitting.",
      "error"
    );
    return;
  }

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    const formData = new FormData(e.target);

    // Submit to Formspree
    const response = await fetch(e.target.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Success state
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";

      // Show success notification
      showNotification(
        "Thank you! Your message has been sent successfully. I'll get back to you soon!",
        "success"
      );

      // Reset form
      e.target.reset();

      // Clear all styling
      requiredFields.forEach((field) => {
        field.style.borderColor = "#e1e5e9";
        clearFieldValidation(field);
      });

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background =
          "linear-gradient(135deg, #6366f1, #06b6d4)";
        submitBtn.disabled = false;
      }, 3000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Form submission error:", error);

    // Error state
    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    submitBtn.style.background = "linear-gradient(135deg, #e74c3c, #c0392b)";

    showNotification(
      "Sorry, there was an error sending your message. Please try again or email me directly at andrejanev96@gmail.com",
      "error"
    );

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = "linear-gradient(135deg, #6366f1, #06b6d4)";
      submitBtn.disabled = false;
    }, 3000);
  }
}

// Simple form validation
function addFormValidation() {
  const inputs = document.querySelectorAll(
    ".contact-form input, .contact-form select, .contact-form textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("blur", function (e) {
      if (e.target.hasAttribute("required")) {
        const value = e.target.value.trim();
        if (!value) {
          e.target.style.borderColor = "#e74c3c";
          showFieldError(e.target, "This field is required");
        } else {
          e.target.style.borderColor = "#27ae60";
          clearFieldValidation(e.target);
        }
      }
    });

    input.addEventListener("focus", function (e) {
      e.target.style.borderColor = "#6366f1";
      clearFieldValidation(e.target);
    });
  });
}

function clearFieldValidation(field) {
  const errorMsg = field.parentNode.querySelector(".field-error");
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showFieldError(field, message) {
  clearFieldValidation(field); // Remove existing error first
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

// Keep the existing notification system
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  addNotificationStyles();
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 100);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 6000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-triangle";
    default:
      return "fa-info-circle";
  }
}

function addNotificationStyles() {
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        min-width: 300px;
      }

      /* Dark mode support */
      .dark-mode .notification {
        background: #2d3748;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      }

      .notification.show {
        transform: translateX(0);
      }

      .notification-content {
        padding: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
      }

      .notification-success {
        border-left: 4px solid #27ae60;
      }

      .notification-error {
        border-left: 4px solid #e74c3c;
      }

      .notification-success i:first-child {
        color: #27ae60;
        font-size: 1.2rem;
        margin-top: 0.1rem;
      }

      .notification-error i:first-child {
        color: #e74c3c;
        font-size: 1.2rem;
        margin-top: 0.1rem;
      }

      .notification-content span {
        flex: 1;
        line-height: 1.4;
        font-size: 0.95rem;
        color: #333;
      }

      /* Dark mode text color */
      .dark-mode .notification-content span {
        color: #e2e8f0;
      }

      .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
        margin-left: 0.5rem;
      }

      .notification-close:hover {
        color: #333;
        background: #f5f5f5;
      }

      /* Dark mode close button */
      .dark-mode .notification-close {
        color: #a0aec0;
      }

      .dark-mode .notification-close:hover {
        color: #e2e8f0;
        background: #4a5568;
      }

      @media (max-width: 768px) {
        .notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
          min-width: auto;
          transform: translateY(-100px);
        }

        .notification.show {
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styles);
  }
}

// ===== TESTIMONIALS CAROUSEL =====
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  // If the carousel isn't on the page, exit early
  if (!track) return;
  const carouselRoot = document.querySelector('.testimonials-carousel');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-next');
  const prevButton = document.querySelector('.carousel-prev');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  let currentIndex = 0;
  let autoPlayInterval;

  // A11y: annotate carousel semantics
  if (carouselRoot) {
    carouselRoot.setAttribute('role', 'region');
    carouselRoot.setAttribute('aria-roledescription', 'carousel');
    carouselRoot.setAttribute('aria-label', 'Client testimonials');
  }
  if (indicatorsContainer) {
    indicatorsContainer.setAttribute('role', 'tablist');
    indicatorsContainer.setAttribute('aria-label', 'Carousel indicators');
  }

  // Progressive perf: lazy-load testimonial images
  document.querySelectorAll('.testimonial-img').forEach((img, i) => {
    try {
      img.loading = 'lazy';
      img.decoding = 'async';
      // Lower priority for below-the-fold images
      if ('fetchPriority' in img) img.fetchPriority = 'low';
    } catch (_) {}
  });

  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    indicator.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-controls', `carousel-slide-${index}`);
    indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = Array.from(indicatorsContainer.children);

  // Move to specific slide
  function goToSlide(targetIndex) {
    if (targetIndex < 0) targetIndex = slides.length - 1;
    if (targetIndex >= slides.length) targetIndex = 0;

    currentIndex = targetIndex;

    // Move track to align the target slide with container's left edge
    // Using pixel offsets ensures correctness with flex gaps and varying widths
    const targetSlide = slides[currentIndex];
    const offset = targetSlide ? targetSlide.offsetLeft : 0;
    track.style.transform = `translateX(${-offset}px)`;

    // Update active slide class for blur effect
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
    });
    slides[currentIndex].classList.add('active');

    // Update indicators
    indicators.forEach((indicator, index) => {
      const isActive = index === currentIndex;
      indicator.classList.toggle('active', isActive);
      indicator.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });
  }

  // Next/Previous handlers
  nextButton.addEventListener('click', () => {
    stopAutoPlay();
    goToSlide(currentIndex + 1);
    startAutoPlay();
  });

  prevButton.addEventListener('click', () => {
    stopAutoPlay();
    goToSlide(currentIndex - 1);
    startAutoPlay();
  });

  // Auto-play functionality
  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 8000); // 8 seconds
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  // Pause auto-play on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      nextButton.click();
    }
  });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped left - go to next
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped right - go to previous
      goToSlide(currentIndex - 1);
    }
  }

  // Initialize
  goToSlide(0); // Set initial active state

  // Respect reduced-motion preferences for autoplay
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    startAutoPlay();
  }

  // Recalculate position on resize/orientation changes
  window.addEventListener('resize', () => {
    // Keep the current slide centered after layout changes
    goToSlide(currentIndex);
  });

  // Pause autoplay when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else if (!prefersReduced) {
      startAutoPlay();
    }
  });

  // ===== Lightbox for testimonial images =====
  const testimonialImgs = Array.from(document.querySelectorAll('.testimonial-img'));
  let lbIndex = 0;

  // Create overlay once
  let lb = document.getElementById('imageLightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'imageLightbox';
    lb.className = 'lightbox-overlay';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
      <button class="lightbox-btn lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
      <div class="lightbox-content"><img class="lightbox-img" alt="Testimonial full view" /></div>
      <button class="lightbox-btn lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
    `;
    document.body.appendChild(lb);
  }

  const lbImg = lb.querySelector('.lightbox-img');
  const lbClose = lb.querySelector('.lightbox-close');
  const lbPrev = lb.querySelector('.lightbox-prev');
  const lbNext = lb.querySelector('.lightbox-next');

  function openLightbox(index) {
    lbIndex = index;
    const node = testimonialImgs[lbIndex];
    if (!node) return;
    const src = node.currentSrc || node.src; // prefer currentSrc from <picture>
    const alt = node.alt || 'Testimonial image';
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showOffset(delta) {
    lbIndex = (lbIndex + delta + testimonialImgs.length) % testimonialImgs.length;
    const node = testimonialImgs[lbIndex];
    if (!node) return;
    const src = node.currentSrc || node.src;
    lbImg.src = src;
    lbImg.alt = node.alt || 'Testimonial image';
  }

  testimonialImgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoPlay();
      openLightbox(i);
    });
    // Add visible zoom hint button (especially for mobile)
    const card = img.closest('.testimonial-card');
    if (card && !card.querySelector('.zoom-hint')) {
      const zh = document.createElement('button');
      zh.className = 'zoom-hint';
      zh.setAttribute('aria-label', 'Tap to zoom');
      zh.innerHTML = '<i class="fas fa-search-plus"></i>';
      zh.addEventListener('click', (ev) => {
        ev.stopPropagation();
        stopAutoPlay();
        openLightbox(i);
      });
      card.appendChild(zh);
    }
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => showOffset(-1));
  lbNext.addEventListener('click', () => showOffset(1));
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  // Keyboard controls for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showOffset(-1);
    if (e.key === 'ArrowRight') showOffset(1);
  });

  // Touch swipe in lightbox
  let lbStartX = 0;
  lb.addEventListener('touchstart', (e) => {
    if (!lb.classList.contains('show')) return;
    lbStartX = e.changedTouches[0].screenX;
  });
  lb.addEventListener('touchend', (e) => {
    if (!lb.classList.contains('show')) return;
    const endX = e.changedTouches[0].screenX;
    const dx = endX - lbStartX;
    if (Math.abs(dx) > 50) {
      showOffset(dx > 0 ? -1 : 1);
    }
  });
});
