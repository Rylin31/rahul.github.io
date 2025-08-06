window.onload = function () {
    // --- Inertial Scroll and UI updates ---

    // Get elements for UI updates
    const scrollbarProgress = document.getElementById("scrollbar-progress");
    const scrollProgressNumber = document.getElementById("scroll-progress-number");
    const backToTopButton = document.getElementById("back-to-top");

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
    });

    // Lenis scroll event listener for progress bar and back-to-top button
    lenis.on('scroll', (e) => {
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

        // Show/hide back to top button based on scroll position
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

    // Animation loop for Lenis
    function animate(time) {
        lenis.raf(time);
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
