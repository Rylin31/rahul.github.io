window.onload = function () {
    // Get elements for scroll animation and UI updates
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");
    const scrollbarProgress = document.getElementById("scrollbar-progress");
    const scrollProgressNumber = document.getElementById("scroll-progress-number");
    const backToTopButton = document.getElementById("back-to-top");
    const loadMoreButton = document.querySelector('.load-more-button');

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
    });

    let target = 0;

    // Lenis scroll event listener for progress bar and back-to-top button
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

    // Variables to hold the width of each individual row for background animation
    let spanWidth1 = 0, spanWidth2 = 0, spanWidth3 = 0;
    const speedMultiplier = 0.3;

    // Function to calculate the width for each row
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

    // Initial calculation and recalculation on window resize
    calculateWidths();
    window.addEventListener('resize', calculateWidths);

    // Animation loop for background text scrolling
    function animate(time) {
        lenis.raf(time);
        const offset = target * speedMultiplier;

        if (spanWidth1 > 0) {
            const leftScroll1 = -(offset % spanWidth1);
            row1.style.transform = `translateX(${leftScroll1}px)`;
        }
        if (spanWidth2 > 0) {
            const rightScroll2 = -spanWidth2 + (offset % spanWidth2);
            row2.style.transform = `translateX(${rightScroll2}px)`;
        }
        if (spanWidth3 > 0) {
            const leftScroll3 = -(offset % spanWidth3);
            row3.style.transform = `translateX(${leftScroll3}px)`;
        }
        requestAnimationFrame(animate);
    }
    animate();

    // Ripple animation for navigation and load more buttons
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

    // Apply ripple animation to the Load More button
    if (loadMoreButton) {
        loadMoreButton.addEventListener('mouseenter', function (e) {
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
    }

    // Dynamic social icon animation
    const socialIconsContainer = document.getElementById('social-icons');
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            socialIcons.forEach((otherIcon, otherIndex) => {
                const distance = Math.abs(index - otherIndex);
                let scale = 1;
                let y = 0;
                let boxShadow = '0 0 0 0px rgba(128, 128, 128, 0)';

                if (distance === 0) { // Hovered icon
                    scale = 1.2;
                    y = -8;
                    boxShadow = '0 0 0 8px rgba(128, 128, 128, 0.5)';
                } else {
                    scale = 1 - (distance * 0.1);
                }

                gsap.to(otherIcon, {
                    y: y,
                    scale: scale,
                    boxShadow: boxShadow,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    });

    // Reset social icons on mouse leave from the container
    if (socialIconsContainer) {
        socialIconsContainer.addEventListener('mouseleave', () => {
            gsap.to(socialIcons, {
                y: 0,
                scale: 1,
                boxShadow: '0 0 0 0px rgba(128, 128, 128, 0)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    }

    // Cursor tooltip and project hover effects
    const cursorTooltip = document.getElementById('cursor-tooltip');
    const projectItems = document.querySelectorAll('.project-item a');
    const brightColors = ['#ff4141', '#00bfff', '#ff9933', '#9933ff', '#ff00ff'];

    // Update tooltip position on mouse move
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursorTooltip, {
            x: e.clientX + 25,
            y: e.clientY + 25,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // Project item hover effects
    projectItems.forEach(item => {
        const title = item.querySelector('.project-title');
        const descriptionEl = item.querySelector('.project-description');
        const description = descriptionEl ? descriptionEl.dataset.description : '';
        const infoElements = item.querySelector('.project-info');
        const skillsElements = item.querySelector('.project-skills');

        item.addEventListener('mouseenter', () => {
            const randomColor = brightColors[Math.floor(Math.random() * brightColors.length)];

            cursorTooltip.innerText = description;
            cursorTooltip.style.backgroundColor = randomColor;

            gsap.to(cursorTooltip, { opacity: 1, scale: 1, duration: 0.4 });
            gsap.to(infoElements, { x: 20, duration: 0.4, ease: 'power2.out' });
            if (skillsElements) {
                gsap.to(skillsElements, { x: -20, duration: 0.4, ease: 'power2.out' });
            }
            title.style.color = randomColor;
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(cursorTooltip, { opacity: 0, scale: 0.8, duration: 0.4 });
            gsap.to(infoElements, { x: 0, duration: 0.4, ease: 'power2.out' });
            if (skillsElements) {
                gsap.to(skillsElements, { x: 0, duration: 0.4, ease: 'power2.out' });
            }
            title.style.color = '#ffffff';
        });
    });
};
