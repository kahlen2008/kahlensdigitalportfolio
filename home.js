/*
   HOME PAGE — "Mouth Portal" scroll animation
   Requires GSAP + ScrollTrigger (and optionally Lenis) loaded before this file.
*/
document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('mouthIntro');
    if (!intro) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No GSAP (offline/CDN blocked) or reduced motion: just show the content.
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReduced) {
        document.body.classList.add('reduced-motion');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ---------- Smooth scrolling (Lenis) ----------
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ lerp: 0.1 });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    // ---------- Initial states ----------
    gsap.set('#revealScreen', { autoAlpha: 0 });
    gsap.set('.reveal-item', { autoAlpha: 0, y: 60 });
    // Zoom origin = centre of the mouth (200, 298) inside the 400x460 viewBox
    gsap.set('#faceWrap', { transformOrigin: '50% 64.78%' });

    // ---------- Entrance pop ----------
    gsap.from('#faceWrap svg', {
        scale: 0.6,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.15,
        transformOrigin: '50% 60%'
    });

    // ---------- Idle blinking ----------
    gsap.timeline({ repeat: -1, repeatDelay: 2.8, delay: 1.5 })
        .to('.eye-g', { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.08, ease: 'power1.in' })
        .to('.eye-g', { scaleY: 1, duration: 0.12, ease: 'power1.out' });

    // ---------- Eyes follow the cursor + parallax code tags ----------
    const lookX = gsap.quickTo('#eyesLook', 'x', { duration: 0.4, ease: 'power3' });
    const lookY = gsap.quickTo('#eyesLook', 'y', { duration: 0.4, ease: 'power3' });
    const tags = gsap.utils.toArray('.float-tag').map((el) => ({
        depth: parseFloat(el.dataset.depth) || 20,
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' })
    }));

    window.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1 … 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        lookX(nx * 6);
        lookY(ny * 4);
        tags.forEach((t) => {
            t.x(nx * t.depth);
            t.y(ny * t.depth);
        });
    });

    // ---------- Typewriter effect for "> hello_world.py" ----------
    const kickerEl = document.getElementById('typewriterText');
    const fullText = '> hello_world.py';
    let typingTimer = null;
    let isTyped = false;

    if (window.scrollY < 200) {
        if (kickerEl) kickerEl.textContent = '';
    } else {
        isTyped = true;
    }

    function startTyping() {
        if (!kickerEl || isTyped) return;
        isTyped = true;
        if (typingTimer) clearTimeout(typingTimer);
        kickerEl.textContent = '';
        let index = 0;

        function typeNext() {
            if (index < fullText.length) {
                kickerEl.textContent += fullText.charAt(index);
                index++;
                const delay = (index === 1) ? 140 : (index === 2 ? 90 : Math.floor(Math.random() * 30 + 40));
                typingTimer = setTimeout(typeNext, delay);
            }
        }
        typeNext();
    }

    function resetTyping() {
        if (!kickerEl) return;
        if (typingTimer) clearTimeout(typingTimer);
        isTyped = false;
        kickerEl.textContent = '';
    }

    // ---------- The scroll-driven portal ----------
    const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
            trigger: intro,
            start: 'top top',
            end: () => '+=' + window.innerHeight * 2.5,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
                if (self.progress < 0.75 && isTyped) {
                    resetTyping();
                } else if (self.progress >= 0.84 && !isTyped) {
                    startTyping();
                }
            }
        }
    });

    tl
        // 1. hint fades, smile becomes a small "oh"
        .to('.intro-corner', { autoAlpha: 0, y: 20, duration: 0.3 }, 0)
        .to('#smile', { opacity: 0, duration: 0.1 }, 0.02)
        .to('#mouth', { attr: { rx: 15, ry: 13 }, duration: 0.25, ease: 'power1.out' }, 0.05)

        // 2. the mouth stretches wide open, eyes squint upward
        .to('#mouth', { attr: { rx: 84, ry: 70, cy: 298 }, duration: 0.7, ease: 'power2.in' }, 0.4)
        .to('#face', { attr: { rx: 112, ry: 130, cy: 250 }, duration: 0.7, ease: 'power2.in' }, 0.4)
        .to('#eyesScroll', { y: -28, scaleY: 0.45, svgOrigin: '200 242', duration: 0.6 }, 0.45)
        .to('#cheeks', { y: -18, opacity: 0, duration: 0.5 }, 0.4)
        .to('#nose', { y: -20, opacity: 0, duration: 0.4 }, 0.4)
        .to('.float-tag', { scale: 0, autoAlpha: 0, stagger: 0.04, duration: 0.35, ease: 'back.in(2)' }, 0.45)

        // 3. dive into the mouth
        .to('#faceWrap', { scale: 30, duration: 1, ease: 'power3.in' }, 1.15)
        .to('#introStage', { backgroundColor: '#0a0a0a', duration: 0.15 }, 1.95)

        // 4. black screen with content
        .to('#revealScreen', { autoAlpha: 1, duration: 0.05 }, 2.1)
        .to('.reveal-item', { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.45, ease: 'power3.out' }, 2.12)
        .call(startTyping, null, 2.15)

        // 5. small hold before unpinning
        .to({}, { duration: 0.35 });
});
