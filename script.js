/* ==============================
   CYNBIT REDESIGN
   Interactive functionality
================================= */

// Mobile navigation
// Only hide .reveal elements once this script is actually running
document.documentElement.classList.add("js");

// Safety net: show everything after 2.5s no matter what
setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}, 2500);
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    // Close the menu after selecting a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });

    // Close the menu if the screen becomes wider
    window.addEventListener("resize", () => {
        if (window.innerWidth > 680) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }
    });
}

// Reveal sections as they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}

/* Contact form demonstration */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        formStatus.className = "form-status";
        formStatus.textContent = "";

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formStatus.classList.add("success");
        formStatus.textContent =
            "Your form passed validation! This is a demo; no email has been sent.";

        contactForm.reset();
    });
}
setTimeout(() => {
    revealElements.forEach(el => el.classList.add("visible"));
}, 2500);
