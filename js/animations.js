// Portfolio V2 - Animation Logic

"use strict";

/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}


/* =========================================================
   HERO REVEAL
========================================================= */

const heroRevealElements =
    document.querySelectorAll(".hero-reveal");

heroRevealElements.forEach((element, index) => {

    setTimeout(() => {
        element.classList.add("is-visible");
    }, 150 + index * 120);

});


/* =========================================================
   TIMELINE REVEAL
========================================================= */

const timelineItems = document.querySelectorAll(
    ".timeline-item"
);

if (timelineItems.length > 0) {

    const timelineObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    timelineItems.forEach((item) => {
        timelineObserver.observe(item);
    });

}


/* =========================================================
   IMAGE REVEAL
========================================================= */

const imageRevealElements =
    document.querySelectorAll(".image-reveal");

if (imageRevealElements.length > 0) {

    const imageObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    imageRevealElements.forEach((element) => {
        imageObserver.observe(element);
    });

}