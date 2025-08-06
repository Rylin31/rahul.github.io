// Ripple animation for navigation buttons
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
