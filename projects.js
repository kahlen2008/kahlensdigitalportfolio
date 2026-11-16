/**
 * Portfolio Projects Module
 * Fulfills Homework Requirements:
 * - ProjectCard component (title, description, tech stack, GitHub link, demo link)
 * - ProjectList component (renders array of 3+ ProjectCards)
 * - FilterBar component (filters cards by technology)
 */

// 1. Projects Data Array (5 real projects)
const projectsData = [
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
    },
    {
        id: "factoriq",
        title: "FactorIQ",
        subtitle: "Facility Management System · June – August 2026",
        category: "AI & Cloud Engineering",
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
        title: "Customer Data Wrangling & Analytics",
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
        reportLabel: "View Report"
    }
];

// 2. ProjectCard Component
// Accepts project object with title, description, techStack, githubLink, demoLink
function ProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'luxe-card project-card';
    card.id = `project-${project.id}`;

    // Optional image screenshot with lightbox
    const imageHtml = project.image ? `
        <div style="border-radius: 20px; overflow: hidden; height: 220px; margin-bottom: 1.5rem; cursor: pointer;"
             onclick="openImageViewer('${project.image}')" role="button" aria-label="View enlarged ${project.title} screenshot" tabindex="0">
            <img src="${project.image}" alt="${project.imageAlt || project.title + ' Screenshot'}"
                 style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    ` : '';

    // Category tag
    const categoryHtml = project.category ? `
        <span style="font-weight: 800; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; font-size: 0.7rem; margin-bottom: 1rem; display: block;">
            ${project.category}
        </span>
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

    if (projects.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-soft); border-radius: 20px; border: 1px dashed var(--border);">
                <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1rem;">No projects found with the selected technology.</p>
                <button class="filter-btn active" onclick="filterProjects('All')" style="margin: 0 auto;">Show All Projects</button>
            </div>
        `;
        return;
    }

    projects.forEach(project => {
        const cardElement = ProjectCard(project);
        container.appendChild(cardElement);
    });
}

// 4. FilterBar Component
// Renders technology filter pills and handles active state
let currentFilter = 'All';

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

// Global filter handler
window.filterProjects = function(tech) {
    currentFilter = tech;
    const projectListContainer = document.getElementById('projectList');
    const filterBarContainer = document.getElementById('filterBar');

    const filtered = (tech === 'All')
        ? projectsData
        : projectsData.filter(p =>
            p.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
        );

    // Re-render ProjectList
    ProjectList(filtered, projectListContainer);

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
