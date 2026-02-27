// ==================== Mobile Menu Toggle ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '0';
        navLinks.style.padding = '1rem 0';
        navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
        navLinks.style.borderBottom = '1px solid #e0e0e0';
    });
}

// Close mobile menu when a link is clicked
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });
});

// ==================== Smooth Scroll for Nav Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Navbar Background on Scroll ====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.92)';
        navbar.style.boxShadow = 'none';
    }
});

// ==================== Animation on Scroll ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.stat-card, .skill-category, .experience-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Skills Progress Animation ====================
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

function animateSkills() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    skillProgressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// ==================== Form Submission ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        this.reset();
    });
}

// ==================== Notification System ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#1a1a2e' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==================== Animations Keyframes ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Active Nav Link on Scroll ====================
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY + 100;
    let currentSection = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '#555555';
        link.style.transition = 'color 0.3s ease';
        link.style.textShadow = 'none';

        if (link.getAttribute('href') === '#' + currentSection) {
            link.style.color = '#1a1a2e';
            link.style.fontWeight = '700';
        } else {
            link.style.fontWeight = '500';
        }
    });
});

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== Parallax Scroll Effect ====================
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroImageContainer = document.querySelector('.hero-image-container');

    if (heroImageContainer) {
        const offset = scrollPosition * 0.5;
        heroImageContainer.style.transform = `translateY(calc(-50% + ${offset}px))`;
    }
});

// ==================== Hexagon Rotation on Scroll ====================
window.addEventListener('scroll', () => {
    const hexagonBorder = document.querySelector('.hexagon-border');
    if (hexagonBorder) {
        const rotation = window.scrollY * 0.5;
        hexagonBorder.style.transform = `rotate(${rotation}deg)`;
    }
});

// ==================== GitHub Repos Auto-Fetch ====================
const GITHUB_USERNAME = 'varshavennapusala';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// Language color map for tags
const LANGUAGE_COLORS = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'C++': '#f34b7d',
    'C#': '#239120',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#4F5D95',
    'Shell': '#89e051',
    'Kotlin': '#A97BFF',
    'Swift': '#F05138',
    'Dart': '#00B4AB',
};

async function fetchGitHubRepos() {
    const container = document.getElementById('github-repos');
    if (!container) return;

    try {
        const response = await fetch(GITHUB_API_URL);

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos = await response.json();

        // Filter out forks, keep only original repos
        const ownRepos = repos.filter(repo => !repo.fork);

        // Prepend custom external projects
        const customProjects = [
            {
                name: 'FIFTEEN-PUZZLE',
                description: 'A classic 15-puzzle game implementation.',
                language: 'Python',
                html_url: 'https://github.com/Lekhya36/FIFTEEN-PUZZLE',
                stargazers_count: 0,
                forks_count: 0,
                topics: ['game', 'puzzle']
            }
        ];

        const allProjects = [...customProjects, ...ownRepos];

        // Clear loading spinner
        container.innerHTML = '';

        if (allProjects.length === 0) {
            container.innerHTML = `
                <div class="repos-error">
                    <p>No repositories found.</p>
                </div>
            `;
            return;
        }

        // Update the stat card with actual repo count
        const statCards = document.querySelectorAll('.stat-card h3');
        if (statCards.length > 0) {
            statCards[0].textContent = `${allProjects.length}+`;
        }

        // Create a card for each repo
        allProjects.forEach((repo, index) => {
            const card = createRepoCard(repo);
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
            container.appendChild(card);

            // Trigger animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
        });

    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        container.innerHTML = `
            <div class="repos-error">
                <p>Unable to load projects right now. Visit
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">my GitHub profile</a>
                    to see all repositories.
                </p>
            </div>
        `;
    }
}

function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const description = repo.description || 'No description available.';
    let language = repo.language || '';
    if (repo.name === 'TOLLGATE-SYSTEM') {
        language = 'DBMS';
    }
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;

    // Format repo name: replace hyphens/underscores with spaces, title case
    const displayName = repo.name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    // Generate a consistent neutral gradient based on repo name
    const hue = hashStringToNumber(repo.name, 0, 360);
    const gradient = `linear-gradient(135deg, hsl(${hue}, 8%, 90%) 0%, hsl(${hue}, 12%, 82%) 100%)`;

    let techTags = '';
    if (language) {
        techTags += `<span class="tech-tag">${language}</span>`;
    }
    if (repo.topics && repo.topics.length > 0) {
        repo.topics.slice(0, 3).forEach(topic => {
            techTags += `<span class="tech-tag">${topic}</span>`;
        });
    }

    let metaInfo = '';
    if (stars > 0 || forks > 0) {
        metaInfo = '<div class="project-meta">';
        if (stars > 0) metaInfo += `<span>⭐ ${stars}</span>`;
        if (forks > 0) metaInfo += `<span>🍴 ${forks}</span>`;
        metaInfo += '</div>';
    }

    card.innerHTML = `
        <div class="project-image" style="background: ${gradient};"></div>
        <div class="project-content">
            <h3>${displayName}</h3>
            ${metaInfo}
            <p class="project-description">${description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub →</a>
            </div>
        </div>
    `;

    return card;
}

// Simple hash function to generate a number from string
function hashStringToNumber(str, min, max) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % (max - min)) + min;
}

// Fetch repos on page load
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
