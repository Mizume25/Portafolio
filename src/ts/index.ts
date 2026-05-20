const darkToggle = document.getElementById('darkToggle') as HTMLButtonElement;
const icon = darkToggle.querySelector('i') as any;




darkToggle?.addEventListener('click', () => {
    
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});