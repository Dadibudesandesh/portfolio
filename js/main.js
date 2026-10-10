// Portfolio V2 - Main JavaScript


/* =========================================================
   PORTFOLIO V2 — MAIN JAVASCRIPT
   Navbar / Mobile Menu / Header Scroll State
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navWrapper = document.querySelector(".nav-wrapper");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (navToggle && navWrapper) {

    /**
     * Open the mobile navigation.
     */
    function openMenu() {
        navWrapper.classList.add("active");

        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close navigation menu");
    }


    /**
     * Close the mobile navigation.
     */
    function closeMenu() {
        navWrapper.classList.remove("active");

        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
    }


    /**
     * Toggle mobile navigation.
     */
    function toggleMenu() {
        const isOpen =
            navToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    /* -----------------------------------------------------
       Hamburger Button
    ----------------------------------------------------- */

    navToggle.addEventListener("click", toggleMenu);


    /* -----------------------------------------------------
       Close Menu When Navigation Link Is Clicked
    ----------------------------------------------------- */

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /* -----------------------------------------------------
       Close Menu With Escape Key
    ----------------------------------------------------- */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            const isOpen =
                navToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
                navToggle.focus();
            }
        }
    });


    /* -----------------------------------------------------
       Close Menu When Clicking Outside
    ----------------------------------------------------- */

    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            navWrapper.contains(event.target);

        const clickedToggle =
            navToggle.contains(event.target);

        const isOpen =
            navToggle.getAttribute("aria-expanded") === "true";

        if (
            isOpen &&
            !clickedInsideNavigation &&
            !clickedToggle
        ) {
            closeMenu();
        }
    });

}


/* =========================================================
   HEADER SCROLL STATE
========================================================= */

if (siteHeader) {

    const updateHeaderOnScroll = () => {

        if (window.scrollY > 30) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

    };


    /* Run once when page loads */
    updateHeaderOnScroll();


    /* Run whenever the user scrolls */
    window.addEventListener(
        "scroll",
        updateHeaderOnScroll,
        { passive: true }
    );

}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");

if (sections.length > 0 && navLinks.length > 0) {

    const updateActiveNavLink = () => {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavLink,
        { passive: true }
    );

    updateActiveNavLink();
}


/* =========================================================
   CLOSE MOBILE MENU ON DESKTOP RESIZE
========================================================= */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 768 &&
        navToggle &&
        navWrapper
    ) {
        navWrapper.classList.remove("active");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        navToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

});

/* =========================================================
   CERTIFICATE MODAL
========================================================= */

const certificateCards = document.querySelectorAll(
    "[data-certificate-modal]"
);

const certificateModal = document.querySelector(
    "#certificate-modal"
);

const certificateModalTitle = document.querySelector(
    "#certificate-modal-title"
);

const certificateModalCategory = document.querySelector(
    "#certificate-modal-category"
);

const certificateModalImage = document.querySelector(
    "#certificate-modal-image"
);

const certificateModalClose = document.querySelector(
    "#certificate-modal-close"
);

const certificateModalBackdrop = document.querySelector(
    ".certificate-modal-backdrop"
);

const certificateImageLoading = document.querySelector(
    "#certificate-image-loading"
);

const certificateImageError = document.querySelector(
    "#certificate-image-error"
);

const certificateErrorPath = document.querySelector(
    "#certificate-error-path"
);

const certificateRetryButton = document.querySelector(
    "#certificate-retry"
);

let lastCertificateTrigger = null;
let currentCertificatePath = "";


/* =========================================================
   CERTIFICATE IMAGE STATES
========================================================= */

function showCertificateLoading() {

    if (certificateImageLoading) {
        certificateImageLoading.hidden = false;
    }

    if (certificateImageError) {
        certificateImageError.hidden = true;
    }

    if (certificateModalImage) {
        certificateModalImage.classList.remove(
            "is-loaded"
        );
    }

    if (certificateRetryButton) {
        certificateRetryButton.classList.remove(
            "is-loading"
        );
    }
}


function showCertificateSuccess() {

    if (certificateImageLoading) {
        certificateImageLoading.hidden = true;
    }

    if (certificateImageError) {
        certificateImageError.hidden = true;
    }

    if (certificateModalImage) {
        certificateModalImage.classList.add(
            "is-loaded"
        );
    }

    if (certificateRetryButton) {
        certificateRetryButton.classList.remove(
            "is-loading"
        );
    }
}


function showCertificateError(imagePath) {

    if (certificateImageLoading) {
        certificateImageLoading.hidden = true;
    }

    if (certificateImageError) {
        certificateImageError.hidden = false;
    }

    if (certificateModalImage) {
        certificateModalImage.classList.remove(
            "is-loaded"
        );
    }

    if (certificateRetryButton) {
        certificateRetryButton.classList.remove(
            "is-loading"
        );
    }

    if (certificateErrorPath) {
        certificateErrorPath.textContent =
            imagePath ||
            "Certificate image not found";
    }
}


/* =========================================================
   LOAD CERTIFICATE IMAGE
========================================================= */

function loadCertificateImage(imagePath) {

    if (!certificateModalImage) {
        return;
    }

    if (!imagePath || !imagePath.trim()) {

        showCertificateError(
            "Certificate image path is missing"
        );

        return;
    }

    currentCertificatePath = imagePath;

    showCertificateLoading();


    /*
     * Cache-busting parameter.
     *
     * This helps when the image was recently uploaded
     * or replaced but the browser still has the old
     * failed response cached.
     */
    const separator =
        imagePath.includes("?") ? "&" : "?";

    const cacheBustedPath =
        `${imagePath}${separator}retry=${Date.now()}`;


    certificateModalImage.removeAttribute(
        "src"
    );

    /*
     * Small delay ensures the browser treats this
     * as a fresh image request.
     */
    requestAnimationFrame(() => {

        certificateModalImage.src =
            cacheBustedPath;

    });
}


/* =========================================================
   OPEN MODAL
========================================================= */

function openCertificateModal(card) {

    if (
        !certificateModal ||
        !certificateModalTitle ||
        !certificateModalImage
    ) {
        return;
    }

    const title =
        card.dataset.certificateTitle ||
        "Certificate";

    const category =
        card.dataset.certificateCategory ||
        "Achievement";

    const image =
        card.dataset.certificateImage ||
        "";

    lastCertificateTrigger = card;

    certificateModalTitle.textContent =
        title;

    certificateModalCategory.textContent =
        category;

    certificateModalImage.alt =
        `${title} certificate`;

    certificateModal.classList.add(
        "is-open"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );


    /*
     * Start image loading.
     */
    loadCertificateImage(image);


    /*
     * Move keyboard focus to close button.
     */
    if (certificateModalClose) {

        requestAnimationFrame(() => {
            certificateModalClose.focus();
        });

    }
}


/* =========================================================
   IMAGE LOAD SUCCESS
========================================================= */

if (certificateModalImage) {

    certificateModalImage.addEventListener(
        "load",
        () => {

            showCertificateSuccess();

        }
    );


    /*
     * Image failed to load.
     */
    certificateModalImage.addEventListener(
        "error",
        () => {

            showCertificateError(
                currentCertificatePath ||
                "Certificate image could not be loaded"
            );

        }
    );
}


/* =========================================================
   RETRY BUTTON
========================================================= */

if (certificateRetryButton) {

    certificateRetryButton.addEventListener(
        "click",
        () => {

            if (!currentCertificatePath) {

                showCertificateError(
                    "Certificate image path is missing"
                );

                return;
            }


            /*
             * Show retrying state.
             */
            certificateRetryButton.classList.add(
                "is-loading"
            );


            /*
             * Reload the certificate.
             */
            loadCertificateImage(
                currentCertificatePath
            );

        }
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeCertificateModal() {

    if (!certificateModal) {
        return;
    }

    certificateModal.classList.remove(
        "is-open"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );


    /*
     * Stop displaying certificate.
     */
    if (certificateModalImage) {

        certificateModalImage.removeAttribute(
            "src"
        );

        certificateModalImage.classList.remove(
            "is-loaded"
        );

        certificateModalImage.alt = "";

    }


    /*
     * Reset loading/error state.
     */
    if (certificateImageLoading) {
        certificateImageLoading.hidden = false;
    }

    if (certificateImageError) {
        certificateImageError.hidden = true;
    }

    if (certificateRetryButton) {
        certificateRetryButton.classList.remove(
            "is-loading"
        );
    }


    currentCertificatePath = "";


    /*
     * Return focus to the achievement card.
     */
    if (lastCertificateTrigger) {

        lastCertificateTrigger.focus();

    }

    lastCertificateTrigger = null;
}


/* =========================================================
   CARD CLICK
========================================================= */

certificateCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            openCertificateModal(card);

        }
    );


    /*
     * Keyboard support:
     * Enter / Space
     */
    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openCertificateModal(card);

            }

        }
    );

});


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (certificateModalClose) {

    certificateModalClose.addEventListener(
        "click",
        closeCertificateModal
    );

}


/* =========================================================
   BACKDROP CLICK
========================================================= */

if (certificateModalBackdrop) {

    certificateModalBackdrop.addEventListener(
        "click",
        closeCertificateModal
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            certificateModal &&
            certificateModal.classList.contains(
                "is-open"
            )
        ) {

            closeCertificateModal();

        }

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

/* =========================================================
   FORMSPREE CONTACT FORM SUBMISSION
========================================================= */

const contactForm = document.querySelector("#contact-form");
const contactSubmit = document.querySelector("#contact-submit");
const contactSubmitText = contactSubmit?.querySelector(
    ".contact-submit-text"
);
const contactSubmitLoading = contactSubmit?.querySelector(
    ".contact-submit-loading"
);
const contactFormStatus = document.querySelector(
    "#contact-form-status"
);

function setContactLoading(isLoading) {
    if (!contactSubmit) return;

    contactSubmit.disabled = isLoading;

    if (contactSubmitText) {
        contactSubmitText.hidden = isLoading;
    }

    if (contactSubmitLoading) {
        contactSubmitLoading.hidden = !isLoading;
    }
}

function displayContactStatus(message, type) {
    if (!contactFormStatus) return;

    contactFormStatus.textContent = message;
    contactFormStatus.classList.remove("success", "error");
    contactFormStatus.classList.add(type);
    contactFormStatus.hidden = false;
}

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Reuse your existing validation function.
        if (
            typeof validateContactForm === "function" &&
            !validateContactForm()
        ) {
            return;
        }

        setContactLoading(true);

        if (contactFormStatus) {
            contactFormStatus.hidden = true;
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                let message = "Message could not be sent. Please try again.";

                try {
                    const result = await response.json();

                    if (result.errors?.length) {
                        message = result.errors
                            .map((item) => item.message)
                            .join(" ");
                    }
                } catch {
                    // Keep the default error message.
                }

                displayContactStatus(message, "error");
                return;
            }

            contactForm.reset();

            const characterCount = document.querySelector(
                "#contact-message-count"
            );

            if (characterCount) {
                characterCount.textContent = "0 / 1000";
            }

            if (typeof clearAllFormErrors === "function") {
                clearAllFormErrors();
            }

            displayContactStatus(
                "Thank you! Your message has been sent successfully.",
                "success"
            );

        } catch (error) {
            console.error("Contact form submission failed:", error);

            displayContactStatus(
                "Network error. Please check your connection and try again.",
                "error"
            );

        } finally {
            setContactLoading(false);
        }
    });
}



/* =========================================================
   FIELD REFERENCES
========================================================= */

const contactFields = {
    name: {
        input: document.querySelector("#contact-name"),
        error: document.querySelector("#contact-name-error")
    },

    email: {
        input: document.querySelector("#contact-email"),
        error: document.querySelector("#contact-email-error")
    },

    subject: {
        input: document.querySelector("#contact-subject"),
        error: document.querySelector("#contact-subject-error")
    },

    message: {
        input: document.querySelector("#contact-message"),
        error: document.querySelector("#contact-message-error")
    }
};


/* =========================================================
   VALIDATION HELPERS
========================================================= */

function setFieldError(field, message) {

    if (!field.input || !field.error) {
        return;
    }

    field.input.classList.add("is-invalid");

    field.error.textContent = message;
}


function clearFieldError(field) {

    if (!field.input || !field.error) {
        return;
    }

    field.input.classList.remove("is-invalid");

    field.error.textContent = "";
}


function clearAllFormErrors() {

    Object.values(contactFields).forEach(
        (field) => clearFieldError(field)
    );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateContactForm() {

    clearAllFormErrors();

    let isValid = true;


    /* Name */
    const name =
        contactFields.name.input.value.trim();

    if (!name) {

        setFieldError(
            contactFields.name,
            "Please enter your name."
        );

        isValid = false;

    } else if (name.length < 2) {

        setFieldError(
            contactFields.name,
            "Name must contain at least 2 characters."
        );

        isValid = false;
    }


    /* Email */
    const email =
        contactFields.email.input.value.trim();

    if (!email) {

        setFieldError(
            contactFields.email,
            "Please enter your email."
        );

        isValid = false;

    } else if (!isValidEmail(email)) {

        setFieldError(
            contactFields.email,
            "Please enter a valid email address."
        );

        isValid = false;
    }


    /* Subject */
    const subject =
        contactFields.subject.input.value.trim();

    if (!subject) {

        setFieldError(
            contactFields.subject,
            "Please enter a subject."
        );

        isValid = false;

    } else if (subject.length < 3) {

        setFieldError(
            contactFields.subject,
            "Subject must contain at least 3 characters."
        );

        isValid = false;
    }


    /* Message */
    const message =
        contactFields.message.input.value.trim();

    if (!message) {

        setFieldError(
            contactFields.message,
            "Please enter a message."
        );

        isValid = false;

    } else if (message.length < 10) {

        setFieldError(
            contactFields.message,
            "Message must contain at least 10 characters."
        );

        isValid = false;
    }


    return isValid;
}


/* =========================================================
   FORM STATUS
========================================================= */

function showContactStatus(
    type,
    message
) {

    if (!contactFormStatus) {
        return;
    }

    contactFormStatus.hidden = false;

    contactFormStatus.className =
        `contact-form-status ${type}`;

    contactFormStatus.textContent =
        message;
}


function clearContactStatus() {

    if (!contactFormStatus) {
        return;
    }

    contactFormStatus.hidden = true;
    contactFormStatus.textContent = "";
    contactFormStatus.className =
        "contact-form-status";
}


/* =========================================================
   SUBMIT STATE
========================================================= */

function setContactSubmitLoading(
    isLoading
) {

    if (
        !contactSubmit ||
        !contactSubmitText ||
        !contactSubmitLoading
    ) {
        return;
    }

    contactSubmit.disabled =
        isLoading;

    contactSubmitText.hidden =
        isLoading;

    contactSubmitLoading.hidden =
        !isLoading;
}


/* =========================================================
   CHARACTER COUNTER
========================================================= */

function updateMessageCount() {

    if (
        !contactMessage ||
        !contactMessageCount
    ) {
        return;
    }

    const currentLength =
        contactMessage.value.length;

    contactMessageCount.textContent =
        `${currentLength} / 1000`;

}


if (contactMessage) {

    contactMessage.addEventListener(
        "input",
        updateMessageCount
    );

    updateMessageCount();
}


/* =========================================================
   CLEAR FIELD ERROR WHEN USER EDITS
========================================================= */

Object.values(contactFields).forEach(
    (field) => {

        if (!field.input) {
            return;
        }

        field.input.addEventListener(
            "input",
            () => {

                clearFieldError(field);
                clearContactStatus();

            }
        );

    }
);


/* =========================================================
   CONTACT FORM SUBMIT
========================================================= */

// if (contactForm) {

//     contactForm.addEventListener(
//         "submit",
//         (event) => {

//             event.preventDefault();


//             /*
//              * Validate before attempting submission.
//              */
//             if (!validateContactForm()) {

//                 const firstInvalidField =
//                     document.querySelector(
//                         ".contact-form .is-invalid"
//                     );

//                 if (firstInvalidField) {
//                     firstInvalidField.focus();
//                 }

//                 return;
//             }


//             const name =
//                 contactFields.name.input.value.trim();

//             const email =
//                 contactFields.email.input.value.trim();

//             const subject =
//                 contactFields.subject.input.value.trim();

//             const message =
//                 contactFields.message.input.value.trim();


//             /*
//              * Show loading state briefly.
//              *
//              * Replace the mailto section below with
//              * your production form API when available.
//              */
//             setContactSubmitLoading(true);
//             clearContactStatus();


//             /*
//              * Build email body.
//              */
//             const emailBody =
//                 `Hello Sandesh,

// Name: ${name}
// Email: ${email}

// Message:
// ${message}

// Sent from Sandesh Dadibude's portfolio.`;


//             /*
//              * Use the verified portfolio email.
//              */
//             const mailtoUrl =
//                 `mailto:sandeshdadibude28042004@gmail.com` +
//                 `?subject=${encodeURIComponent(subject)}` +
//                 `&body=${encodeURIComponent(emailBody)}`;


//             /*
//              * Open the visitor's email client.
//              */
//             window.location.href =
//                 mailtoUrl;


//             /*
//              * Restore button state.
//              */
//             window.setTimeout(
//                 () => {

//                     setContactSubmitLoading(false);

//                     showContactStatus(
//                         "success",
//                         "Your email client should open now. If it doesn't, please email me directly."
//                     );

//                 },
//                 700
//             );

//         }
//     );

// }