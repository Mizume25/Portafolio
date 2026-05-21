import * as item from './elements.js';

let change = false;

item.darkToggle?.addEventListener('click', () => {

    document.body.classList.toggle('dark');

    item.logos.forEach((logo) => {
        if (logo.alt == "MariaDB") {

            let image = change ? 'MariaDB-dark-logo.png' : 'MariaDB-logo.png';

            logo.src = `assets/img/${image}`;
        }

        if (logo.alt == "Next.js") {

            let image = change ? 'next-light.png' : 'next-dark.png';
            logo.src = `assets/img/${image}`;
        }
    })

    change = !change;

    if (document.body.classList.contains('dark')) {

        item.icon.classList.remove('fa-moon');
        item.icon.classList.add('fa-sun');
    } else {
        item.icon.classList.remove('fa-sun');
        item.icon.classList.add('fa-moon');
    }
});


interface Tech {
    name: string;
    logo: string;
    links: { label: string; url: string }[];
    desc: string;
    certs: { name: string; url: string }[];
    features: string[];
}

let techs: Tech[] = [];
let current = 0;
function renderDots(): void {
    item.techDots.innerHTML = '';
    techs.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('tech-dot');
        if (i === current) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        item.techDots.appendChild(dot);
    });
}

function goTo(index: number): void {
    current = (index + techs.length) % techs.length;
    render();
}

function render(): void {
    const tech = techs[current];

    const elements = [item.techLogo, item.techTitle, item.techDesc, item.techFeatures, item.techLinks, item.techCerts];
    elements.forEach(el => el.classList.add('tech-fade'));

    setTimeout(() => {
        item.techLogo.src = tech.logo;
        item.techLogo.alt = tech.name;
        item.techTitle.textContent = tech.name;
        item.techDesc.textContent = tech.desc;

        item.techLinks.innerHTML = tech.links.map(l =>
            `<a href="${l.url}" target="_blank" class="tech-link">
                <i class="fa-brands fa-github"></i> ${l.label}
            </a>`
        ).join('');

        // Actualiza la iteración
        item.techCerts.innerHTML = tech.certs.length > 0
            ? tech.certs.map(c =>
                `<a href="${c.url}" target="_blank" class="tech-cert-badge">
            <i class="fa-solid fa-certificate"></i> ${c.name}
        </a>`
            ).join('')
            : '';

        item.techFeatures.innerHTML = tech.features.map(f =>
            `<li>${f}</li>`
        ).join('');

        elements.forEach(el => el.classList.remove('tech-fade'));
        renderDots();

    }, 200);
}

item.techPrev.addEventListener('click', () => goTo(current - 1));
item.techNext.addEventListener('click', () => goTo(current + 1));

fetch('src/json/tech.json')
    .then(res => res.json())
    .then((data: Tech[]) => {
        techs = data;
        renderDots();
        render();
    })
    .catch(err => console.error('Error cargando techs.json:', err));

interface Project {
    name: string;
    status: string;
    desc: string;
    stack: string[];
    stack_logos: string[];
    screenshots: string[];
}

let projects: Project[] = [];
let currentProject = 0;
let currentImg = 0;

function renderProjectDots(): void {
    item.projectDots.innerHTML = '';
    projects.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('tech-dot');
        if (i === currentProject) dot.classList.add('active');
        dot.addEventListener('click', () => goToProject(i));
        item.projectDots.appendChild(dot);
        
    });
}

function renderImgDots(): void {
    const project = projects[currentProject];
    item.projectImgDots.innerHTML = '';
    project.screenshots.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('project-img-dot');
        if (i === currentImg) dot.classList.add('active');
        dot.addEventListener('click', () => goToImg(i));
        item.projectImgDots.appendChild(dot);
    });
}

let pendingImg: HTMLImageElement | null = null;

function goToImg(index: number): void {
    const project = projects[currentProject];
    currentImg = (index + project.screenshots.length) % project.screenshots.length;
    item.projectImg.classList.add('fade');

    // Cancela la carga anterior si existe
    if (pendingImg) {
        pendingImg.onload = null;
        pendingImg.src = '';
        pendingImg = null;
    }

    const newImg = new Image();
    pendingImg = newImg;

    newImg.onload = () => {
        if (pendingImg !== newImg) return; // ya fue cancelada
        item.projectImg.src = newImg.src;
        item.projectImg.classList.remove('fade');
        pendingImg = null;
        renderImgDots();
    };

    newImg.src = project.screenshots[currentImg];
}

function goToProject(index: number): void {
    currentProject = (index + projects.length) % projects.length;
    currentImg = 0;
    stopImgAutoplay();
    renderProject();
}

function renderProject(): void {
    const project = projects[currentProject];

    const leftElements = [item.projectTitle, item.projectDesc, item.projectStackLogos, item.projectStackTags];
    leftElements.forEach(el => el.classList.add('tech-fade-opacity'));
    item.projectImg.classList.add('fade');
    item.projectImg.loading = 'lazy';

    setTimeout(() => {
        item.projectTitle.textContent = project.name;
        item.projectDesc.textContent = project.desc;

        const statusClass = project.status.toLowerCase().replace(' ', '-');
        item.projectStatus.className = `project-status ${statusClass}`;
        item.projectStatus.textContent = project.status;

        item.projectStackLogos.innerHTML = project.stack_logos.map(logo =>
            `<img src="assets/img/${logo}" alt="${logo}">`
        ).join('');

        item.projectStackTags.innerHTML = project.stack.map(tag =>
            `<span class="project-tag">${tag}</span>`
        ).join('');

        item.projectImg.src = project.screenshots[currentImg];
        item.projectImg.alt = project.name;

        leftElements.forEach(el => el.classList.remove('tech-fade-opacity'));
        item.projectImg.classList.remove('fade');

        renderProjectDots();
        renderImgDots();
        startImgAutoplay();
    }, 200);
}

item.projectPrev.addEventListener('click', () => goToProject(currentProject - 1));
item.projectNext.addEventListener('click', () => goToProject(currentProject + 1));

fetch('src/json/projects.json')
    .then(res => res.json())
    .then((data: Project[]) => {
        projects = data;
        renderProjectDots();
        renderProject();
    })
    .catch(err => console.error('Error cargando projects.json:', err));


let imgInterval: ReturnType<typeof setInterval> | null = null;

function startImgAutoplay(): void {
    if (imgInterval) clearInterval(imgInterval);
    imgInterval = setInterval(() => {
        const project = projects[currentProject];
        if (project.screenshots.length > 1) {
            goToImg(currentImg + 1);
        }
    }, 3000);
}

function stopImgAutoplay(): void {
    if (imgInterval) {
        clearInterval(imgInterval);
        imgInterval = null;
    }
}

interface TimelineItem {
    type: string;
    title: string;
    institution: string;
    period: string;
}

fetch('src/json/experience.json')
    .then(res => res.json())
    .then((data: TimelineItem[]) => {
        const container = document.getElementById('timelineItems') as HTMLElement;
        const progress = document.getElementById('timelineProgress') as HTMLElement;


        container.innerHTML = data.map(item => `
            <div class="timeline-item">
                <div class="timeline-dot ${item.type}"></div>
                <div class="timeline-info">
                    <i class="timeline-icon fa-solid ${item.type === 'formacion' ? 'fa-graduation-cap' : 'fa-briefcase'}"></i>
                    <p class="timeline-title">${item.title}</p>
                    <p class="timeline-institution">${item.institution}</p>
                    <p class="timeline-period">${item.period}</p>
                </div>
            </div>
        `).join('');

        // Anima la barra cuando entra en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const isMobile = window.innerWidth <= 768;
                    if (isMobile) {
                        progress.style.height = '100%';
                    } else {
                        progress.style.width = '100%';
                    }
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(container);
    })
    .catch(err => console.error('Error cargando timeline.json:', err));

const projectsSection = document.querySelector('.projects-section') as HTMLElement;

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startImgAutoplay();
        } else {
            stopImgAutoplay();
        }
    });
}, { threshold: 0.3 });

sectionObserver.observe(projectsSection);

// Resalta el nav link de la sección visible
const sections = ['tecnologias', 'proyectos', 'experiencia'];
const navLinks = document.querySelectorAll('.section-nav__link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.section-nav__link[data-section="${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
});