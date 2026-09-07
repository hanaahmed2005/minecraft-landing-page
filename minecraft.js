/* =====================================================
   MINECRAFT LANDING PAGE
   JAVASCRIPT
===================================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navBtn = document.querySelector(".nav-btn");


    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            if (navLinks) {
                navLinks.classList.toggle("mobile-active");
            }

            if (navBtn) {
                navBtn.classList.toggle("mobile-active");
            }

            menuToggle.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING A LINK
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {
                navLinks.classList.remove("mobile-active");
            }

            if (navBtn) {
                navBtn.classList.remove("mobile-active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        });

    });


    /* ===================================================== 
   TRAILER MODAL 
===================================================== */ 

const trailerBtn = 
    document.getElementById("trailerBtn"); 

const trailerModal = 
    document.getElementById("trailerModal"); 

const closeTrailer = 
    document.getElementById("trailerClose"); 


/* Open Trailer */ 

if (trailerBtn && trailerModal) { 

    trailerBtn.addEventListener("click", function () { 

        trailerModal.classList.add("active"); 

        document.body.classList.add("modal-open"); 

    }); 

}


/* Close Trailer */ 

if (closeTrailer && trailerModal) { 

    closeTrailer.addEventListener("click", function () { 

        trailerModal.classList.remove("active"); 

        document.body.classList.remove("modal-open"); 

        const trailerVideo = 
            document.getElementById("trailerVideo"); 

        if (trailerVideo) { 

            trailerVideo.pause(); 

            trailerVideo.currentTime = 0; 

        } 

    }); 

}


/* Close Modal By Clicking Outside */ 

if (trailerModal) { 

    trailerModal.addEventListener("click", function (event) { 

        if (event.target === trailerModal) { 

            trailerModal.classList.remove("active"); 

            document.body.classList.remove("modal-open"); 

            const trailerVideo = 
                document.getElementById("trailerVideo"); 

            if (trailerVideo) { 

                trailerVideo.pause(); 

                trailerVideo.currentTime = 0; 

            } 

        } 

    }); 

}


/* Close Modal With ESC */ 

document.addEventListener("keydown", function (event) { 

    if ( 
        event.key === "Escape" && 
        trailerModal 
    ) { 

        trailerModal.classList.remove("active"); 

        document.body.classList.remove("modal-open"); 

        const trailerVideo = 
            document.getElementById("trailerVideo"); 

        if (trailerVideo) { 

            trailerVideo.pause(); 

            trailerVideo.currentTime = 0; 

        } 

    } 

});


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener("scroll", function () {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .mode-card, .blog-card, .section-heading"
        );


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       BUTTON CLICK EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, .outline-btn, .nav-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.add("clicked");


            setTimeout(function () {

                button.classList.remove("clicked");

            }, 200);

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    window.addEventListener("scroll", function () {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const statNumbers =
        document.querySelectorAll(".stat strong");


    const statsSection =
        document.querySelector(".community");


    let countersStarted = false;


    function startCounters() {

        if (countersStarted) {
            return;
        }


        countersStarted = true;


        statNumbers.forEach(function (counter) {

            const text =
                counter.textContent.trim();


            if (text.includes("140")) {

                animateCounter(
                    counter,
                    0,
                    140,
                    1500,
                    "M+"
                );

            }

        });

    }


    function animateCounter(
        element,
        start,
        end,
        duration,
        suffix
    ) {

        let startTime = null;


        function updateCounter(currentTime) {

            if (!startTime) {

                startTime = currentTime;

            }


            const progress =
                Math.min(
                    (currentTime - startTime) / duration,
                    1
                );


            const currentValue =
                Math.floor(
                    progress * (end - start) + start
                );


            element.textContent =
                currentValue + suffix;


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            }

        }


        requestAnimationFrame(updateCounter);

    }


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            startCounters();

                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );


        statsObserver.observe(statsSection);

    }


    /* =====================================================
       BLOG / UPDATES IMAGE SLIDESHOW
    ===================================================== */

    /*
       كل Blog Card ممكن يحتوي على:

       <div class="blog-image-slider">

           <img class="blog-image active" src="image1.jpg">
           <img class="blog-image" src="image2.jpg">
           <img class="blog-image" src="image3.jpg">

       </div>

       الصور هتتغير تلقائيًا كل ثانيتين.
    */


    const blogCards =
        document.querySelectorAll(".blog-card");


    blogCards.forEach(function (card) {

        const slider =
            card.querySelector(".blog-image-slider");


        if (!slider) {
            return;
        }


        const images =
            slider.querySelectorAll(".blog-image");


        if (images.length <= 1) {
            return;
        }


        let currentIndex = 0;


        /* =================================================
           INITIAL IMAGE
        ================================================= */

        images.forEach(function (image, index) {

            image.classList.remove("active");

            if (index === 0) {
                image.classList.add("active");
            }

        });


        /* =================================================
           OPTIONAL DOTS
        ================================================= */

        const dotsContainer =
            card.querySelector(".blog-dots");


        let dots = [];


        if (dotsContainer) {

            dotsContainer.innerHTML = "";


            images.forEach(function (_, index) {

                const dot =
                    document.createElement("span");


                dot.classList.add("blog-dot");


                if (index === 0) {
                    dot.classList.add("active");
                }


                dotsContainer.appendChild(dot);

                dots.push(dot);

            });

        }


        /* =================================================
           CHANGE IMAGE
        ================================================= */

        function changeBlogImage() {

            const previousIndex =
                currentIndex;


            currentIndex =
                (currentIndex + 1) % images.length;


            images[previousIndex]
                .classList.remove("active");


            images[currentIndex]
                .classList.add("active");


            /* Update dots */

            if (dots.length > 0) {

                dots.forEach(function (dot) {

                    dot.classList.remove("active");

                });


                dots[currentIndex]
                    .classList.add("active");

            }

        }


        /* =================================================
           START SLIDESHOW
        ================================================= */

        setInterval(
            changeBlogImage,
            2000
        );

    });


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const backgroundElements =
        document.querySelectorAll(
            ".hero, .world-cta, .community, .mode-card, .blog-image"
        );


    backgroundElements.forEach(function (element) {

        element.addEventListener(
            "error",
            function () {

                element.classList.add("image-error");

            }
        );

    });


    /* =====================================================
       PARALLAX HERO EFFECT
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    window.addEventListener("scroll", function () {

        if (!hero) {
            return;
        }


        if (window.innerWidth > 700) {

            const scrollPosition =
                window.scrollY;


            if (
                scrollPosition <
                hero.offsetHeight
            ) {

                hero.style.backgroundPosition =
                    `center ${scrollPosition * 0.25}px`;

            }

        }

    });


    /* =====================================================
       SMOOTH CTA BUTTONS
    ===================================================== */

    const startButtons =
        document.querySelectorAll(
            'a[href="#play"]'
        );


    startButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();


            const playSection =
                document.getElementById("play");


            if (playSection) {

                playSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       BLOG / MODE LINKS
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            '.mode-link, .blog-content a, .outline-btn, .footer-social a'
        );


    emptyLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (href === "#") {

            link.addEventListener("click", function (event) {

                event.preventDefault();

            });

        }

    });


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    window.dispatchEvent(
        new Event("scroll")
    );

});


/* =====================================================
   WORLD CTA REVEAL
===================================================== */

const worldCTA =
    document.querySelector(".world-cta");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );


if (worldCTA) {

    observer.observe(worldCTA);

}



/* =====================================================
   BLOG IMAGE SLIDESHOW
===================================================== */

const blogCards = document.querySelectorAll(".blog-card");

blogCards.forEach((card) => {

    const slider = card.querySelector(".blog-slider");

    if (!slider) return;

    const images = slider.querySelectorAll("img");

    if (images.length <= 1) return;

    let currentIndex = 0;

    // Make sure only the first image is visible
    images.forEach((image, index) => {
        image.classList.remove("active");

        if (index === 0) {
            image.classList.add("active");
        }
    });

    // Change image every 2 seconds
    setInterval(() => {

        // Hide current image
        images[currentIndex].classList.remove("active");

        // Move to next image
        currentIndex++;

        // Back to first image
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        // Show next image
        images[currentIndex].classList.add("active");

    }, 2000);

});