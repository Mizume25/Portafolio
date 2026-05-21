// ─── elements.ts ─────────────────────────────────────────
export const darkToggle  = document.getElementById('darkToggle')     as HTMLButtonElement;
export const icon        = darkToggle.querySelector('i')             as HTMLElement;
export const logos       = document.querySelectorAll<HTMLImageElement>('.logo-float');

// Slider tecnologías
export const techLogo     = document.getElementById('techLogo')      as HTMLImageElement;
export const techTitle    = document.getElementById('techTitle')     as HTMLElement;
export const techLinks    = document.getElementById('techLinks')     as HTMLElement;
export const techDesc     = document.getElementById('techDesc')      as HTMLElement;
export const techCerts    = document.getElementById('techCerts')     as HTMLElement;
export const techFeatures = document.getElementById('techFeatures')  as HTMLElement;
export const techDots     = document.getElementById('techDots')      as HTMLElement;
export const techPrev     = document.getElementById('techPrev')      as HTMLButtonElement;
export const techNext     = document.getElementById('techNext')      as HTMLButtonElement;


// ─── Proyectos ────────────────────────────────────────
export const projectTitle      = document.getElementById('projectTitle')      as HTMLElement;
export const projectDesc       = document.getElementById('projectDesc')       as HTMLElement;
export const projectStatus     = document.getElementById('projectStatus')     as HTMLElement;
export const projectStackLogos = document.getElementById('projectStackLogos') as HTMLElement;
export const projectStackTags  = document.getElementById('projectStackTags')  as HTMLElement;
export const projectImg        = document.getElementById('projectImg')        as HTMLImageElement;
export const projectDots       = document.getElementById('projectDots')       as HTMLElement;
export const projectImgDots    = document.getElementById('projectImgDots')    as HTMLElement;
export const projectPrev       = document.getElementById('projectPrev')       as HTMLButtonElement;
export const projectNext       = document.getElementById('projectNext')       as HTMLButtonElement;