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

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
  }
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
});

// Add loading state and smooth transitions
document.addEventListener("DOMContentLoaded", function () {
  // Add loaded class to body for any CSS transitions
  document.body.classList.add("loaded");

  // Initialize any additional interactive features
  initializeInteractiveFeatures();
});

function initializeInteractiveFeatures() {
  // Add hover effects for skill categories
  const skillCategories = document.querySelectorAll(".skill-category");
  skillCategories.forEach((category) => {
    category.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    category.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects for buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    closeMobileMenu();
  }

  // Navigate through sections with arrow keys (optional enhancement)
  if (e.altKey) {
    const sections = ["home", "skills", "experience", "projects", "contact"];
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

// Update active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const currentSection = getCurrentSection();
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Header background change
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
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
// Replace your existing contact form JavaScript with this

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

  // Validate all fields before submitting
  if (!validateAllFields(e.target)) {
    showNotification(
      "Please fill in all required fields correctly before submitting.",
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

      // Reset form and validation states
      e.target.reset();
      clearAllValidation(e.target);

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background =
          "linear-gradient(135deg, #0abab5, #56dfcf)";
        submitBtn.disabled = false;
      }, 3000);
    } else {
      // Handle Formspree errors
      const data = await response.json();
      throw new Error(data.error || "Form submission failed");
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
      submitBtn.style.background = "linear-gradient(135deg, #0abab5, #56dfcf)";
      submitBtn.disabled = false;
    }, 3000);
  }
}

// Enhanced form validation
function addFormValidation() {
  const inputs = document.querySelectorAll(
    ".contact-form input, .contact-form select, .contact-form textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("blur", function (e) {
      validateField(e.target);
    });

    input.addEventListener("input", function (e) {
      if (e.target.classList.contains("was-validated")) {
        validateField(e.target);
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute("required");

  // Clear previous validation
  clearFieldValidation(field);

  // Mark as validated
  field.classList.add("was-validated");

  let isValid = true;

  if (isRequired && !value) {
    showFieldError(field, "This field is required");
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    isValid = false;
  } else if (field.type === "email" && value && !isValidEmail(value)) {
    showFieldError(field, "Please enter a valid email address");
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    isValid = false;
  } else if (field.tagName === "SELECT" && isRequired && !value) {
    showFieldError(field, "Please select an option");
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    isValid = false;
  } else if (value) {
    // Field has value and passes validation
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
  }

  return isValid;
}

function validateAllFields(form) {
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let allValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      allValid = false;
    }
  });

  return allValid;
}

function clearFieldValidation(field) {
  field.classList.remove("is-valid", "is-invalid");
  const errorMsg = field.parentNode.querySelector(".field-error");
  if (errorMsg) {
    errorMsg.remove();
  }
}

function clearAllValidation(form) {
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.classList.remove("was-validated", "is-valid", "is-invalid");
    clearFieldValidation(input);
  });
}

function showFieldError(field, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Enhanced notification system (keep existing)
function showNotification(message, type = "info") {
  // Remove any existing notifications
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

  // Add notification styles if not already added
  addNotificationStyles();

  // Add to page
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add("show"), 100);

  // Auto remove after 6 seconds
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
    case "warning":
      return "fa-exclamation-circle";
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
        
        .notification-content {
          padding: 1rem;
        }
      }
    `;
    document.head.appendChild(styles);
  }
}

// Form validation enhancement (optional)
function addFormValidation() {
  const inputs = document.querySelectorAll(
    ".contact-form input, .contact-form select, .contact-form textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearValidation);
  });
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();

  clearValidation(e);

  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "This field is required");
    return false;
  }

  if (field.type === "email" && value && !isValidEmail(value)) {
    showFieldError(field, "Please enter a valid email address");
    return false;
  }

  return true;
}

function clearValidation(e) {
  const field = e.target;
  field.style.borderColor = "#e1e5e9";
  const errorMsg = field.parentNode.querySelector(".field-error");
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showFieldError(field, message) {
  field.style.borderColor = "#e74c3c";

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.style.color = "#e74c3c";
  errorDiv.style.fontSize = "0.8rem";
  errorDiv.style.marginTop = "0.3rem";
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize form validation when DOM is loaded
document.addEventListener("DOMContentLoaded", addFormValidation);
