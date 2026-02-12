document.addEventListener('DOMContentLoaded', () => {
    // Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));

    // Navbar Scroll State
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks?.classList.toggle('active');
        });
    }

    // Close menu when clicking links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
        });
    });

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        // Clear error on input
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('button');
                const originalContent = btn.innerHTML;

                btn.innerHTML = 'SENDING REQUEST...';
                btn.disabled = true;

                // Submit to Formspree using fetch
                fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        const successModal = document.getElementById('successModal');
                        if (successModal) {
                            successModal.classList.add('active');
                        }
                        contactForm.reset();
                    } else {
                        alert('Something went wrong. Please try again or contact me directly via LinkedIn.');
                    }
                }).catch(error => {
                    alert('Submission failed. Please check your connection and try again.');
                }).finally(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                });
            }
        });
    }

    // Modal Close Logic
    window.closeModal = () => {
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.classList.remove('active');
        }
    };

    // Image Viewer Logic
    window.openImageViewer = (src) => {
        const viewer = document.getElementById('imageViewer');
        const img = document.getElementById('viewerImg');
        if (viewer && img) {
            img.src = src;
            viewer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        }
    };

    window.closeImageViewer = () => {
        const viewer = document.getElementById('imageViewer');
        if (viewer) {
            viewer.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        }
    };
});
