var _a;
import * as item from './elements.js';
let change = false;
(_a = item.darkToggle) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
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
    });
    change = !change;
    if (document.body.classList.contains('dark')) {
        item.icon.classList.remove('fa-moon');
        item.icon.classList.add('fa-sun');
    }
    else {
        item.icon.classList.remove('fa-sun');
        item.icon.classList.add('fa-moon');
    }
});
let techs = [];
let current = 0;
function renderDots() {
    item.techDots.innerHTML = '';
    techs.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('tech-dot');
        if (i === current)
            dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        item.techDots.appendChild(dot);
    });
}
function goTo(index) {
    current = (index + techs.length) % techs.length;
    render();
}
function render() {
    const tech = techs[current];
    const elements = [item.techLogo, item.techTitle, item.techDesc, item.techFeatures, item.techLinks, item.techCerts];
    elements.forEach(el => el.classList.add('tech-fade'));
    setTimeout(() => {
        item.techLogo.src = tech.logo;
        item.techLogo.alt = tech.name;
        item.techTitle.textContent = tech.name;
        item.techDesc.textContent = tech.desc;
        item.techLinks.innerHTML = tech.links.map(l => `<a href="${l.url}" target="_blank" class="tech-link">
                <i class="fa-brands fa-github"></i> ${l.label}
            </a>`).join('');
        // Actualiza la iteración
        item.techCerts.innerHTML = tech.certs.length > 0
            ? tech.certs.map(c => `<a href="${c.url}" target="_blank" class="tech-cert-badge">
            <i class="fa-solid fa-certificate"></i> ${c.name}
        </a>`).join('')
            : '';
        item.techFeatures.innerHTML = tech.features.map(f => `<li>${f}</li>`).join('');
        elements.forEach(el => el.classList.remove('tech-fade'));
        renderDots();
    }, 200);
}
item.techPrev.addEventListener('click', () => goTo(current - 1));
item.techNext.addEventListener('click', () => goTo(current + 1));
fetch('src/json/tech.json')
    .then(res => res.json())
    .then((data) => {
    techs = data;
    renderDots();
    render();
})
    .catch(err => console.error('Error cargando techs.json:', err));
