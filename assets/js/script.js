let menubutton = document.getElementById('menu-button');
let phone = document.getElementById('section-1-phone');
let fechar = document.getElementById('fechar');

menubutton.addEventListener('click', () => {
    phone.classList.remove('sai');
    phone.classList.add('entra');
    menubutton.style.opacity = '0';
})

fechar.addEventListener('click', () => {
    phone.classList.remove('entra');
    phone.classList.add('sai');
    menubutton.style.opacity = '1';
})