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