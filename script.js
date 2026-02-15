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

    // Journey Card Toggle (Case Study page)
    window.toggleCard = (card) => {
        const wasExpanded = card.classList.contains('expanded');

        // Close all cards
        document.querySelectorAll('.journey-card').forEach(c => {
            c.classList.remove('expanded');
        });

        // Open this card if it wasn't already open
        if (!wasExpanded) {
            card.classList.add('expanded');
        }
    };

    // Scroll to and expand a journey card (from stat buttons)
    window.scrollToCard = (cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
            // Close all cards first
            document.querySelectorAll('.journey-card').forEach(c => {
                c.classList.remove('expanded');
            });

            // Expand this card
            card.classList.add('expanded');

            // Smooth scroll with offset for navbar
            setTimeout(() => {
                const rect = card.getBoundingClientRect();
                const offset = window.scrollY + rect.top - 120;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }, 100);
        }
    };

    // Tech Detail Panel
    window.showTechDetail = (item) => {
        const panel = document.getElementById('techDetailPanel');
        const title = document.getElementById('techDetailTitle');
        const text = document.getElementById('techDetailText');

        if (!panel || !title || !text) return;

        const techName = item.getAttribute('data-tech');
        const techDetail = item.getAttribute('data-detail');

        // If clicking the same item that's already active, close it
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            panel.classList.remove('active');
            return;
        }

        // Remove active from all tech items
        document.querySelectorAll('.tech-item').forEach(t => {
            t.classList.remove('active');
        });

        // Set this one as active
        item.classList.add('active');

        // Update panel content
        title.textContent = techName;
        text.textContent = techDetail;

        // Show panel
        panel.classList.add('active');

        // Auto-scroll only if the detail panel is off-screen
        setTimeout(() => {
            const panelRect = panel.getBoundingClientRect();
            const isVisible = panelRect.top >= 0 && panelRect.bottom <= window.innerHeight;
            if (!isVisible) {
                panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 400);
    };

    window.closeTechDetail = (e) => {
        e.stopPropagation();
        const panel = document.getElementById('techDetailPanel');
        if (panel) {
            panel.classList.remove('active');
        }
        document.querySelectorAll('.tech-item').forEach(t => {
            t.classList.remove('active');
        });
    };

    // Auto-expand first journey card
    const firstCard = document.querySelector('.journey-card');
    if (firstCard) {
        setTimeout(() => {
            firstCard.classList.add('expanded');
        }, 800);
    }

    // Custom Video Player
    const video = document.getElementById('demoVideo');
    const overlay = document.getElementById('videoPlayOverlay');
    const player = document.getElementById('videoPlayer');
    const playBtn = document.getElementById('vcPlayBtn');
    const progressFilled = document.getElementById('vcProgressFilled');
    const timeDisplay = document.getElementById('vcTime');

    if (video) {
        const formatTime = (s) => {
            const m = Math.floor(s / 60);
            const sec = Math.floor(s % 60);
            return m + ':' + (sec < 10 ? '0' : '') + sec;
        };

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const pct = (video.currentTime / video.duration) * 100;
                progressFilled.style.width = pct + '%';
                timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
            }
        });

        video.addEventListener('ended', () => {
            player.classList.remove('playing');
            overlay.classList.remove('hidden');
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        // Click video itself to toggle play
        video.addEventListener('click', () => {
            window.togglePlay();
        });
    }

    window.togglePlay = () => {
        if (!video) return;
        if (video.paused) {
            video.play();
            player.classList.add('playing');
            overlay.classList.add('hidden');
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            player.classList.remove('playing');
            overlay.classList.remove('hidden');
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    };

    window.seekVideo = (e) => {
        if (!video) return;
        const bar = document.getElementById('vcProgress');
        const rect = bar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        video.currentTime = pct * video.duration;
    };

    window.toggleFullscreen = () => {
        if (!player) return;
        if (!document.fullscreenElement) {
            player.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen();
        }
    };

    // Handle fullscreen change — auto-play on enter, update icon
    document.addEventListener('fullscreenchange', () => {
        const fsBtn = player?.querySelector('.vc-btn:last-child i');
        if (document.fullscreenElement === player) {
            if (fsBtn) fsBtn.className = 'fas fa-compress';
            if (video.paused) window.togglePlay();
        } else {
            if (fsBtn) fsBtn.className = 'fas fa-expand';
        }
    });

    // Skill Tag Click Logic (Interactive Expertise Card)
    const skillTags = document.querySelectorAll('.skill-tag');
    const descArea = document.getElementById('skill-desc-area');
    const descText = document.getElementById('skill-desc-text');

    if (skillTags.length > 0 && descArea && descText) {
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const desc = tag.getAttribute('data-desc');
                if (!desc) return;

                // If clicking the same one, just return or toggle
                if (tag.classList.contains('active')) return;

                // Remove active from all tags
                skillTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                // Animate change
                descArea.style.display = 'block';
                descText.style.opacity = '0';

                setTimeout(() => {
                    descText.textContent = desc;
                    descText.style.opacity = '1';

                    // Auto-scroll if the description area is not fully visible
                    const rect = descArea.getBoundingClientRect();
                    const isFullyVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);

                    if (!isFullyVisible) {
                        descArea.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }
                }, 300);
            });
        });
    }
});
