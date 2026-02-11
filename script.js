document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Navbar Scrolled State
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

    // CV Download Logic
    const cvButtons = document.querySelectorAll('a[href="#"], #resume-download');
    cvButtons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes('cv') || btn.innerText.toLowerCase().includes('resume')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Check if file exists, else alert
                const resumePath = 'resume.pdf';

                // Dynamic check or just prompt
                alert('Downloading Kahlen\'s Resume... (Ensure resume.pdf is in the root folder)');

                // Force download if file exists
                const link = document.createElement('a');
                link.href = resumePath;
                link.download = 'Kahlen_Ong_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    });
});
