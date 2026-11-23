/**
 * Portfolio Projects Module
 * Fulfills Homework Requirements:
 * - ProjectCard component (title, description, tech stack, GitHub link, demo link)
 * - ProjectList component (renders array of 3+ ProjectCards)
 * - FilterBar component (filters cards by technology)
 * - Smooth FLIP animation (First, Last, Invert, Play) on filter clicks
 */

// 1. Projects Data Array (6 real projects)
const projectsData = [
    {
        id: "recipeplan",
        title: "RecipePlan",
        subtitle: "Recipe Finder & Meal Planner · October – November 2026",
        category: "Full Stack Development",
        image: "images/recipeplan.png",
        imageAlt: "RecipePlan Home Page Screenshot",
        imagePosition: "top",
        techStack: ["JavaScript", "Firebase", "Tailwind CSS", "TheMealDB API"],
        description: [
            "Built sign-up, login and Google sign-in, the two-step diet and allergy onboarding, and the profile page as team lead.",
            "Implemented diet and allergy warnings that flag or hide clashing recipes, and a language switcher supporting 130+ languages.",
            "Wrote the Firestore security rules and led integration, merging the team’s work and fixing bugs across features."
        ],
        githubLink: null,
        demoLink: "https://kahlen2008.github.io/webprogproject/",
        demoLabel: "View Live",
        studyLink: "recipeplan-study.html"
    },
    {
        id: "factoriq",
        title: "FactorIQ",
        subtitle: "Facility Management System · June – August 2026",
        category: "Full Stack Development",
        image: "images/factoriq.png",
        imageAlt: "FactorIQ Platform Screenshot",
        techStack: ["Next.js", "Firebase", "Firestore", "Scikit-Learn", "Vertex AI"],
        description: [
            "Developed the facility management module for environmental monitoring, HACCP compliance, incident management, and zone monitoring.",
            "Designed Firestore (NoSQL) data structures for real-time sensor data, compliance logs, incidents, and predictive alerts.",
            "Built Scikit-learn predictive alerts to forecast environmental threshold breaches.",
            "Integrated Vertex AI for image-based pest and hygiene detection with automatic incident creation."
        ],
        githubLink: null,
        demoLink: null,
        studyLink: "factoriq-study.html"
    },
    {
        id: "gym-calories",
        title: "Gym Calories Predictive Analytics",
        subtitle: "Predictive Modelling · July – August 2026",
        category: "Data Science & Analytics",
        image: null,
        techStack: ["KNIME", "SAS Viya", "Predictive Modelling"],
        description: [
            "Cleaned and transformed a 4,865-record dataset in KNIME for predictive analysis.",
            "Built and compared Linear Regression, Decision Tree, Random Forest, and Gradient Boosting Models in SAS Viya using Model Comparison.",
            "Evaluated model performance using validation ASE, selecting Gradient Boosting as the lowest-error model."
        ],
        githubLink: null,
        demoLink: null,
        reportLink: "predictive%20analytics%20report.pdf",
        reportLabel: "View Report"
    },
    {
        id: "customer-data",
        title: "Data Wrangling Project",
        subtitle: "Data Cleaning & Visualisation · July 2026",
        category: "Data Engineering",
        image: null,
        techStack: ["KNIME", "Data Cleaning"],
        description: [
            "Integrated and cleaned 1,506 customer records from 4 regional datasets into a consistent, analysis-ready dataset for downstream analysis.",
            "Applied validation, feature engineering, and anonymisation, including age & income grouping, SSN hashing, and name masking.",
            "Produced customer spending insights through grouped analysis and visualisation."
        ],
        githubLink: null,
        demoLink: null,
        reportLink: "data%20wrangling%20report.pdf",
        reportLabel: "View Report",
        highlight: "Module Distinction (top 5% of cohort)."
    },
    {
        id: "motivation-app",
        title: "A-Level Motivation Web App",
        subtitle: "Interactive Web Platform · April 2026",
        category: "Full Stack Development",
        image: "images/a-level web app.png",
        imageAlt: "A-Level Motivation Web App Screenshot",
        techStack: ["HTML", "Tailwind CSS", "JavaScript", "Firebase"],
        description: [
            "Built an interactive Web App with Firebase Authentication, profiles, and persistent user data.",
            "Developed mood-based motivation, a shared message board, and a timed mini-game to boost engagement."
        ],
        githubLink: null,
        demoLink: "https://motivationalboard.netlify.app/",
        demoLabel: "View Live"
    },
    {
        id: "bridgify",
        title: "Bridgify",
        subtitle: "Event Management & Booking System · October 2025 – February 2026",
        category: "Full Stack Development",
        image: "images/bridgify.png",
        imageAlt: "Bridgify Platform Screenshot",
        techStack: ["Flask", "SQLite", "JavaScript", "FullCalendar", "Jinja2"],
        description: [
            "Developed a full-stack event management and booking system with calendar-based browsing, search, and capacity-controlled registration.",
            "Designed an SQLite relational database and Flask APIs for bookings, withdrawals, and admin CRUD operations.",
            "Implemented RBAC, validation, and event suggestion workflows, including duplicate-registration and past-event safeguards."
        ],
        githubLink: null,
        demoLink: null,
        studyLink: "bridgify-study.html"
    }
];

// 2. ProjectCard Component
// Accepts project object with title, description, techStack, githubLink, demoLink
function ProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'luxe-card project-card';
    card.id = `project-${project.id}`;
    card.dataset.id = project.id;

    // Optional image screenshot with lightbox
    const imageHtml = project.image ? `
        <div style="border-radius: 20px; overflow: hidden; height: 220px; margin-bottom: 1.5rem; cursor: pointer;"
             onclick="openImageViewer('${project.image}')" role="button" aria-label="View enlarged ${project.title} screenshot" tabindex="0">
            <img src="${project.image}" alt="${project.imageAlt || project.title + ' Screenshot'}"
                 style="width: 100%; height: 100%; object-fit: cover; object-position: ${project.imagePosition || 'center'};">
        </div>
    ` : '';

    // Category tag
    const categoryHtml = project.category ? `
        <span style="font-weight: 800; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; font-size: 0.7rem; margin-bottom: 1rem; display: block;">
            ${project.category}
        </span>
    ` : '';

    // Optional highlight note (e.g. a grade this project contributed to)
    const highlightHtml = project.highlight ? `
        <p class="project-highlight"><i class="fas fa-star" aria-hidden="true"></i><span>${project.highlight}</span></p>
    ` : '';

    // Tech badges
    const techStackHtml = project.techStack.map(tech => `
        <span style="padding: 5px 13px; background: var(--bg-main); border: 1px solid var(--border); border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">
            ${tech}
        </span>
    `).join('');

    // Description bullets
    const descriptionHtml = Array.isArray(project.description)
        ? project.description.map(point => `
            <li style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; padding-left: 1.2rem; position: relative;">
                <span style="position: absolute; left: 0; color: var(--accent); font-weight: 800;">→</span>
                ${point}
            </li>
        `).join('')
        : `<p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.7;">${project.description}</p>`;

    // Action links: strictly renders what is available (no fake links)
    const links = [];

    // Optional GitHub Link (rendered only if present)
    if (project.githubLink) {
        links.push(`
            <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline"
               style="font-size: 0.8rem; padding: 1rem 1.8rem;">
                GitHub <i class="fab fa-github"></i>
            </a>
        `);
    }

    // Optional Live / Demo Link
    if (project.demoLink) {
        links.push(`
            <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-dark"
               style="font-size: 0.8rem; padding: 1rem 1.8rem;">
                ${project.demoLabel || 'View Live'} <i class="fas fa-external-link-alt"></i>
            </a>
        `);
    }

    // Existing Study Link
    if (project.studyLink) {
        links.push(`
            <a href="${project.studyLink}" class="btn btn-dark"
               style="font-size: 0.8rem; padding: 1rem 1.8rem;">
                Explore Full Study <i class="fas fa-arrow-right"></i>
            </a>
        `);
    }

    // Existing Report Link
    if (project.reportLink) {
        links.push(`
            <a href="${project.reportLink}" target="_blank" rel="noopener noreferrer" class="btn btn-dark"
               style="font-size: 0.8rem; padding: 1rem 1.8rem; text-transform: uppercase;">
                ${project.reportLabel || 'View Report'} <i class="fas fa-file-pdf"></i>
            </a>
        `);
    }

    const linksHtml = links.length > 0 ? `
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: auto;">
            ${links.join('')}
        </div>
    ` : '';

    card.innerHTML = `
        ${imageHtml}
        ${categoryHtml}
        <h3 style="font-size: 1.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 0.5rem;">${project.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 600;">${project.subtitle}</p>
        ${highlightHtml}
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1.5rem;">
            ${techStackHtml}
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem;">
            ${descriptionHtml}
        </ul>
        ${linksHtml}
    `;

    return card;
}

// 3. ProjectList Component
// Renders an array of project objects into a designated container
function ProjectList(projects, container) {
    if (!container) return;
    container.innerHTML = '';

    projects.forEach(project => {
        const cardElement = ProjectCard(project);
        container.appendChild(cardElement);
    });
}

// 4. FilterBar Component
// Renders technology filter pills and handles active state
let currentFilter = 'All';
let isAnimating = false;

function FilterBar(technologies, activeTech, onFilterChange, container) {
    if (!container) return;
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `filter-btn ${activeTech === 'All' ? 'active' : ''}`;
    allBtn.setAttribute('type', 'button');
    allBtn.setAttribute('aria-pressed', activeTech === 'All' ? 'true' : 'false');
    allBtn.innerHTML = `All <span class="count">(${projectsData.length})</span>`;
    allBtn.addEventListener('click', () => onFilterChange('All'));
    container.appendChild(allBtn);

    technologies.forEach(tech => {
        const count = projectsData.filter(p =>
            p.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
        ).length;

        if (count > 0) {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${activeTech.toLowerCase() === tech.toLowerCase() ? 'active' : ''}`;
            btn.setAttribute('type', 'button');
            btn.setAttribute('aria-pressed', activeTech.toLowerCase() === tech.toLowerCase() ? 'true' : 'false');
            btn.innerHTML = `${tech} <span class="count">(${count})</span>`;
            btn.addEventListener('click', () => onFilterChange(tech));
            container.appendChild(btn);
        }
    });
}

/**
 * Smooth FLIP Animation Filter Handler
 * First: Record bounding boxes of currently visible cards
 * Last: Apply filter to update DOM layout
 * Invert: Calculate transform offsets (dx, dy)
 * Play: Animate cards smoothly into their new positions
 */
window.filterProjects = function(tech) {
    if (tech === currentFilter || isAnimating) return;
    currentFilter = tech;
    isAnimating = true;

    const projectListContainer = document.getElementById('projectList');
    const filterBarContainer = document.getElementById('filterBar');
    if (!projectListContainer) return;

    const cards = Array.from(projectListContainer.querySelectorAll('.project-card'));

    // [F] FIRST: Record initial positions of all visible cards
    const firstRects = new Map();
    cards.forEach(card => {
        if (card.style.display !== 'none') {
            firstRects.set(card.dataset.id, card.getBoundingClientRect());
        }
    });

    // Determine matching project IDs
    const matchingIds = new Set(
        (tech === 'All'
            ? projectsData
            : projectsData.filter(p => p.techStack.some(t => t.toLowerCase() === tech.toLowerCase()))
        ).map(p => p.id)
    );

    // [L] LAST: Apply DOM updates
    cards.forEach(card => {
        const isMatch = matchingIds.has(card.dataset.id);
        if (isMatch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // Handle Empty State if no project matches
    let emptyState = document.getElementById('projectEmptyState');
    if (matchingIds.size === 0) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.id = 'projectEmptyState';
            emptyState.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-soft); border-radius: 20px; border: 1px dashed var(--border);';
            emptyState.innerHTML = `
                <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1rem;">No projects found with the selected technology.</p>
                <button class="filter-btn active" onclick="filterProjects('All')" style="margin: 0 auto;">Show All Projects</button>
            `;
            projectListContainer.appendChild(emptyState);
        }
        emptyState.style.display = '';
    } else if (emptyState) {
        emptyState.style.display = 'none';
    }

    // [I] INVERT: Calculate position deltas and invert with transforms
    const visibleCards = cards.filter(card => matchingIds.has(card.dataset.id));

    visibleCards.forEach(card => {
        const lastRect = card.getBoundingClientRect();
        const firstRect = firstRects.get(card.dataset.id);

        if (firstRect) {
            // Card was already visible -> invert position difference
            const dx = firstRect.left - lastRect.left;
            const dy = firstRect.top - lastRect.top;

            card.style.transition = 'none';
            card.style.transform = `translate(${dx}px, ${dy}px)`;
            card.style.opacity = '1';
        } else {
            // Card is entering -> start slightly scaled down with opacity 0
            card.style.transition = 'none';
            card.style.transform = 'scale(0.92) translateY(20px)';
            card.style.opacity = '0';
        }
    });

    // Force browser reflow to register inverted positions before animating
    projectListContainer.offsetHeight;

    // [P] PLAY: Animate smoothly to natural grid layout
    requestAnimationFrame(() => {
        let completedCount = 0;
        const totalCards = visibleCards.length;

        if (totalCards === 0) {
            isAnimating = false;
        }

        visibleCards.forEach((card, index) => {
            const isEntering = !firstRects.has(card.dataset.id);
            const delay = isEntering ? (index * 0.04) : 0;

            card.style.transition = `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
            card.style.transform = '';
            card.style.opacity = '1';

            const onTransitionEnd = (e) => {
                if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
                    card.style.transition = '';
                    card.removeEventListener('transitionend', onTransitionEnd);
                    completedCount++;
                    if (completedCount >= totalCards) {
                        isAnimating = false;
                    }
                }
            };

            card.addEventListener('transitionend', onTransitionEnd);
        });

        // Fallback safety timeout in case transitionend is skipped
        setTimeout(() => {
            visibleCards.forEach(card => { card.style.transition = ''; });
            isAnimating = false;
        }, 550);
    });

    // Re-render FilterBar active state
    FilterBar(primaryTechnologies, currentFilter, window.filterProjects, filterBarContainer);
};

// Key technologies featured across the portfolio
const primaryTechnologies = [
    "JavaScript",
    "Flask",
    "Next.js",
    "Firebase",
    "KNIME"
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const projectListContainer = document.getElementById('projectList');
    const filterBarContainer = document.getElementById('filterBar');

    if (projectListContainer) {
        // Initial render: show all projects
        ProjectList(projectsData, projectListContainer);

        // Initial render: filter bar
        if (filterBarContainer) {
            FilterBar(primaryTechnologies, currentFilter, window.filterProjects, filterBarContainer);
        }
    }
});
