window.onload = function () {
    // --- Inertial Scroll and UI updates (Matched with original site) ---

    // Get elements for UI updates
    const scrollbarProgress = document.getElementById("scrollbar-progress");
    const scrollProgressNumber = document.getElementById("scroll-progress-number");
    const backToTopButton = document.getElementById("back-to-top");

    // These elements are for the parallax effect on the home page.
    // They won't be found on this page, but the code is included to ensure
    // the scrolling mechanics are identical.
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");

    // Initialize Lenis for smooth scrolling with the same settings as the home page
    const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
    });

    let target = 0;

    // Lenis scroll event listener
    lenis.on('scroll', (e) => {
        target = e.scroll;
        const progress = e.progress;

        // Update scrollbar progress
        if (scrollbarProgress) {
            scrollbarProgress.style.height = `${progress * 100}%`;
        }

        // Update scroll progress number and apply active class
        if (scrollProgressNumber) {
            scrollProgressNumber.innerText = Math.round(progress * 100);
            scrollProgressNumber.classList.add("active");
            clearTimeout(scrollProgressNumber._timeout);
            scrollProgressNumber._timeout = setTimeout(() => {
                scrollProgressNumber.classList.remove("active");
            }, 300);
        }

        // Show/hide back to top button
        if (backToTopButton) {
            if (e.scroll > 200) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        }
    });

    // Handle click for back to top button
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { duration: 1.2, easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t });
        });
    }

    // --- Parallax logic from original site (for consistency) ---
    // This part of the code won't do anything visually on this page,
    // but it ensures the scroll calculations are identical to the home page.
    let spanWidth1 = 0, spanWidth2 = 0, spanWidth3 = 0;
    const speedMultiplier = 0.3;

    function calculateWidths() {
        if (row1 && row1.querySelector("span")) {
            spanWidth1 = row1.querySelector("span").offsetWidth;
        }
        if (row2 && row2.querySelector("span")) {
            spanWidth2 = row2.querySelector("span").offsetWidth;
        }
        if (row3 && row3.querySelector("span")) {
            spanWidth3 = row3.querySelector("span").offsetWidth;
        }
    }

    calculateWidths();
    window.addEventListener('resize', calculateWidths);

    // Animation loop for Lenis and parallax calculations
    function animate(time) {
        lenis.raf(time);
        
        const offset = target * speedMultiplier;
        if (spanWidth1 > 0) {
            row1.style.transform = `translateX(${-(offset % spanWidth1)}px)`;
        }
        if (spanWidth2 > 0) {
            row2.style.transform = `translateX(${-spanWidth2 + (offset % spanWidth2)}px)`;
        }
        if (spanWidth3 > 0) {
            row3.style.transform = `translateX(${-(offset % spanWidth3)}px)`;
        }
        
        requestAnimationFrame(animate);
    }
    animate();


    // --- Ripple animation for navigation buttons ---
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            const size = Math.max(this.clientWidth, this.clientHeight);
            ripple.style.width = ripple.style.height = `${size}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1500);
        });
    });
};
