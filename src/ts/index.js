var darkToggle = document.getElementById('darkToggle');
var icon = darkToggle.querySelector('i');
darkToggle === null || darkToggle === void 0 ? void 0 : darkToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
